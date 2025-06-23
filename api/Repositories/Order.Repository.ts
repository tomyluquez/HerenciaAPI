import { Op, ValidationError } from "sequelize";
import { OrderSearchDTO } from "../../Interfaces/Search/OrderSearch.interface";
import { OrderVM } from "../../Models/Order/OrderVM.model";
import Order from "../../Database/Models/Order.model";
import User from "../../Database/Models/User.model";
import OrderStatus from "../../Database/Models/OrderStatus.model";
import { OrderStatusEnum } from "../../Enums/OrderStatusEnum";
import { mapOrderDetailDBToVm, mapOrdersDBToVM, mapOrderStatusDBToVM } from "../../Helpers/Map/OrderMap";
import { Errors } from "../../Enums/Errors.enum";
import { OrderDetailVM } from "../../Models/Order/OrderDetail.model";
import DiscountCoupon from "../../Database/Models/DiscountCoupon.model";
import PaymentMethod from "../../Database/Models/PaymentMethod.model";
import ShippingMethod from "../../Database/Models/ShippingMethod.model";
import OrderItems from "../../Database/Models/OrderItem.model";
import Variant from "../../Database/Models/Variant.model";
import Product from "../../Database/Models/Product.model";
import Size from "../../Database/Models/Size.model";
import { ResponseMessages } from "../../Models/ResponseMessages.model";
import { Success } from "../../Enums/SuccessEnum";
import { OrderStatusVM } from "../../Models/Order/OrderStatus.model";
import { OrderDB } from "../../Interfaces/Order/OrderDB.interface";
import { SaveOrderResponse } from "../../Models/Order/SaveOrderResponse.model";
import sequelize from "../../Database/connection";
import { finishCartByCartIdRepository } from "./Cart.Repository";

export const getOrdersRepository = async (search: OrderSearchDTO): Promise<OrderVM> => {
    const response = new OrderVM();
    const offset = (search.Pagination.Page - 1) * search.Pagination.Limit;

    const orders = await Order.findAll({
        where: {
            ...(search.orderNumber && { OrderNumber: search.orderNumber }),
            ...(search.StartDate && search.EndDate && { DateCreated: { [Op.between]: [search.StartDate, search.EndDate] } })
        },
        include: [
            {
                model: User,
                as: "User",
                attributes: ["Name", "Email"],
                ...(search.customerName && { where: { Name: { [Op.like]: `%${search.customerName}%` } } })
            },
            {
                model: OrderStatus,
                as: "OrderStatus",
                attributes: ["Id", "Name", "Color"],
                ...(search.orderStatus && search.orderStatus !== OrderStatusEnum.All && { where: { Id: search.orderStatus } })
            }
        ],
        order: [["DateCreated", "DESC"]],
        offset,
        limit: search.Pagination.Limit
    });

    if (orders.length > 0) {
        response.Items = orders.map(mapOrdersDBToVM);
        response.TotalItems = await getQuantityOders(search);
    } else {
        response.setWarning(Errors.OrdersNotFound);
    }

    return response;
};

export const getOrderDetailByIdRepository = async (orderId: number): Promise<OrderDetailVM> => {
    const response = new OrderDetailVM();

    const order = await Order.findOne({
        where: {
            ...(orderId && { Id: orderId })
        },
        include: [
            {
                model: DiscountCoupon,
                as: "DiscountCoupon",
                attributes: ["Name"],
                required: false
            },
            {
                model: PaymentMethod,
                as: "PaymentMethod",
                attributes: ["Name"],
                required: false
            },
            {
                model: ShippingMethod,
                as: "ShippingMethod",
                attributes: ["Name"],
                required: false
            },
            {
                model: OrderStatus,
                as: "OrderStatus",
                attributes: ["Name"],
            },
            {
                model: User,
                as: "User",
                attributes: ["Name"],
            },
            {
                model: OrderItems,
                as: "OrderItems",
                attributes: ["Id", "Quantity", "UnitPrice", "TotalPrice"],
                include: [
                    {
                        model: Variant,
                        as: 'Variant',
                        include: [
                            {
                                model: Product,
                                as: 'Product',
                                attributes: ['Name']
                            },
                            {
                                model: Size,
                                as: 'Size',
                                attributes: ['Name']
                            }
                        ]
                    }
                ]
            }
        ],
    });

    if (order) {
        response.Items = mapOrderDetailDBToVm(order);
    } else {
        response.setWarning(Errors.OrdersNotFound);
    }

    return response;
};

export const getOrderDetailByOrderNumberRepository = async (orderNumber: number): Promise<OrderDetailVM> => {
    const response = new OrderDetailVM();

    const order = await Order.findOne({
        where: {
            ...(orderNumber && { OrderNumber: orderNumber })
        },
        include: [
            {
                model: DiscountCoupon,
                as: "DiscountCoupon",
                attributes: ["Name"],
                required: false
            },
            {
                model: PaymentMethod,
                as: "PaymentMethod",
                attributes: ["Name"],
                required: false
            },
            {
                model: ShippingMethod,
                as: "ShippingMethod",
                attributes: ["Name"],
                required: false
            },
            {
                model: OrderStatus,
                as: "OrderStatus",
                attributes: ["Name"],
            },
            {
                model: User,
                as: "User",
                attributes: ["Name"],
            },
            {
                model: OrderItems,
                as: "OrderItems",
                attributes: ["Id", "Quantity", "UnitPrice", "TotalPrice"],
                include: [
                    {
                        model: Variant,
                        as: 'Variant',
                        include: [
                            {
                                model: Product,
                                as: 'Product',
                                attributes: ['Name']
                            },
                            {
                                model: Size,
                                as: 'Size',
                                attributes: ['Name']
                            }
                        ]
                    }
                ]
            }
        ],
    });

    if (order) {
        response.Items = mapOrderDetailDBToVm(order);
    } else {
        response.setWarning(Errors.OrdersNotFound);
    }

    return response;
};

export const getQuantityOders = async (search: OrderSearchDTO): Promise<number> => {
    return await Order.count({
        where: {
            ...(search.orderNumber && { OrderNumber: search.orderNumber })
        },
        include: [
            {
                model: User,
                as: "User",
                attributes: ["Name"],
                ...(search.customerName && { where: { Name: { [Op.like]: `%${search.customerName}%` } } })
            },
            {
                model: OrderStatus,
                as: "OrderStatus",
                attributes: ["Name"],
                ...(search.orderStatus && { where: { Id: search.orderStatus } })
            }
        ]
    });
};

export const getOrderStatusByIdRepository = async (statusId: number): Promise<OrderStatus | null> => {
    return await OrderStatus.findOne({ where: { Id: statusId } });
};

export const changeStatusOrderRepository = async (orderStatusId: number, orderId: number): Promise<ResponseMessages> => {
    const response = new ResponseMessages();

    const [affectedRow] = await Order.update({ OrderStatusId: orderStatusId }, { where: { Id: orderId } });

    if (affectedRow > 0) {
        response.setSuccess(Success.StatusChanged);
    } else {
        response.setError(Errors.StatusCahnge);
    }

    return response;
};

export const getOrderStatusRepository = async (): Promise<OrderStatusVM> => {
    const response = new OrderStatusVM();

    const orderStatusDB = await OrderStatus.findAll();

    if (orderStatusDB.length > 0) {
        response.Items = orderStatusDB.map(mapOrderStatusDBToVM);
    } else {
        response.setError(Errors.OrderStatusNotFound);
    }

    return response;
};

export const saveOrderRepository = async (newOrder: OrderDB, cartId: number, user: User): Promise<SaveOrderResponse> => {
    const transaction = await sequelize.transaction();
    const response = new SaveOrderResponse();
    console.log(user)
    try {
        // Crear la orden sin los items primero
        const { Details, ...orderData } = newOrder;
        const order = await Order.create(orderData, { transaction });

        // Si hay items, crearlos asociados a la orden
        if (Details && Details.length > 0) {
            await OrderItems.bulkCreate( // <-- Usar el modelo OrderItems, no el array
                Details.map(item => ({
                    ...item,
                    OrderId: order.Id // Asignar la relación
                })),
                { transaction }
            );
            // Descontar stock de cada variante
            for (const item of Details) {
                await Variant.decrement(
                    { Stock: item.Quantity },
                    {
                        where: { Id: item.VariantId },
                        transaction
                    }
                );
            }
        }

        await transaction.commit();
        await finishCartByCartIdRepository(cartId);
        response.setSuccess(Success.SaveOrder);
        response.OrderNumber = order.OrderNumber;
        response.CustomerEmail = user.Email;
        response.CustomerName = user.Name;
        return response;
    } catch (error) {
        await transaction.rollback();
        // Mostrar el error completo en consola
        console.error('Error al guardar orden:', error);

        // Si es un error de validación de Sequelize, mostrar detalles
        if (error instanceof ValidationError) {
            console.error('Errores de validación:', error.errors);
        }

        response.setError(Errors.ProductSave);
        return response;
    }
}
