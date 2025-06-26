import Order from "../../Database/Models/Order.model";
import OrderStatus from "../../Database/Models/OrderStatus.model";
import { OrderDTO } from "../../Interfaces/Order/Order.interface";
import { OrderDB } from "../../Interfaces/Order/OrderDB.interface";
import { IOrderDetailVM } from "../../Interfaces/Order/OrderDetail.interface";
import { IOrderStatusVM } from "../../Interfaces/Order/OrderStatus.interface";
import { IOrderVM } from "../../Interfaces/Order/OrderVM.interface";
import { OrderSearchDTO } from "../../Interfaces/Search/OrderSearch.interface";
import { mapPaginationQueryToDTO } from "./PaginationMap";

export const mapOrderSearchQueryToDTO = (params: any): OrderSearchDTO => {
    return {
        customerName: params.customerName,
        orderNumber: +params.orderNumber,
        orderStatus: +params.orderStatus,
        Pagination: mapPaginationQueryToDTO(params),
        StartDate: params.startDate ? new Date(params.startDate) : null,
        EndDate: params.endDate ? new Date(params.endDate) : null
    };
};

export const mapOrdersDBToVM = (order: Order): IOrderVM => {
    return {
        Id: order.Id,
        OrderNumber: order.OrderNumber,
        DateCreated: order.DateCreated,
        CustomerName: order.User?.Name || "",
        OrderStatusId: order.OrderStatusId,
        CustomerEmail: order.User?.Email || ""
    };
};

export const mapOrderStatusDBToVM = (orderStatus: OrderStatus): IOrderStatusVM => {
    return {
        Id: orderStatus.Id,
        Name: orderStatus.Name,
        Color: orderStatus.Color
    };
};

export const mapOrderDetailDBToVm = (order: Order): IOrderDetailVM => {
    return {
        Id: order.Id,
        OrderNumber: order.OrderNumber,
        Total: order.Total,
        Subtotal: order.Subtotal,
        DiscountCouponTotal: order.DiscountCouponTotal,
        DiscountCoupon: order.DiscountCoupon?.Name || "Sin cupon de descuento",
        DiscountPaymentTotal: order.DiscountPaymentTotal,
        DateCreated: order.DateCreated,
        OrderStatus: order.OrderStatus?.Name || "Estado no encontrado",
        OrderStatusId: order.OrderStatusId,
        PaymentMethod: order.PaymentMethod?.Name || "Sin método de pago",
        ShippingMethod: order.ShippingMethod?.Name || "Sin método de envío",
        CustomerName: order.User?.Name || "",
        CustomerPhone: order.User?.Phone || 0,
        CustomerEmail: order.User?.Email || "",
        Details: order.OrderItems?.map((orderItem) => {
            return {
                Id: orderItem.Id,
                Name: orderItem.Variant?.Product?.Name || "Nombre no encontrado",
                Quantity: orderItem.Quantity,
                UnitPrice: orderItem.UnitPrice,
                TotalPrice: orderItem.TotalPrice,
                SizeName: orderItem.Variant?.Size?.Name || "Talle no encontrado",
                SizeId: orderItem.Variant?.Size?.Id || 0,
                VariantId: orderItem.VariantId
            };
        }) || []
    };
};

export const mapOrderDTOToDB = (order: OrderDTO, userId: number): OrderDB => {
    const newOrder: OrderDB = {
        Id: order.Id,
        OrderNumber: order.OrderNumber,
        IsActive: true,
        Total: order.Total,
        Subtotal: order.Subtotal,
        DiscountCouponTotal: order.DiscountCouponTotal,
        DiscountCouponPercentage: order.DiscountCouponPercentage,
        DiscountCouponId: order.DiscountCouponId,
        DiscountPaymentTotal: order.DiscountPaymentTotal,
        DiscountPaymentPercentage: order.DiscountPaymentPercentage,
        DateCreated: order.DateCreated,
        DateUpdated: new Date(),
        UserId: userId,
        PromotionId: order.PromotionId,
        PaymentMethodId: order.PaymentMethodId,
        ShippingMethodId: order.ShippingMethodId,
        ShippingCost: order.ShippingCost,
        OrderStatusId: order.OrderStatusId,
        CustomerName: order.CustomerName,
        Details: order.Details?.map(i => ({
            Id: i.Id,
            Quantity: i.Quantity,
            UnitPrice: i.UnitPrice,
            TotalPrice: i.TotalPrice,
            DateCreated: order.DateCreated,
            DateUpdated: new Date(),
            VariantId: i.VariantId,
            OrderId: order.Id,
        })) || undefined
    };
    return newOrder
}

