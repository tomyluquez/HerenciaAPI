import { Errors } from "../../Enums/Errors.enum";
import { mapOrderDTOToDB } from "../../Helpers/Map/OrderMap";
import { OrderDTO } from "../../Interfaces/Order/Order.interface";
import { OrderSearchDTO } from "../../Interfaces/Search/OrderSearch.interface";
import { OrderDetailVM } from "../../Models/Order/OrderDetail.model";
import { OrderStatusVM } from "../../Models/Order/OrderStatus.model";
import { OrderVM } from "../../Models/Order/OrderVM.model";
import { SaveOrderResponse } from "../../Models/Order/SaveOrderResponse.model";
import { ResponseMessages } from "../../Models/ResponseMessages.model";
import { isValidSatusOrder } from "../../Validators/OrderValidators";
import { changeStatusOrderRepository, getOrderDetailByIdRepository, getOrderDetailByOrderNumberRepository, getOrdersRepository, getOrderStatusRepository, saveOrderRepository } from "../Repositories/Order.Repository";
import { getUserByNameRepository } from "../Repositories/User.Repository";

export const getOrdersService = async (search: OrderSearchDTO): Promise<OrderVM> => {
    return await getOrdersRepository(search);
};

export const getOrderDetailByIdService = async (orderId: number): Promise<OrderDetailVM> => {
    return await getOrderDetailByIdRepository(orderId);
}

export const getOrderDetailByOrderNumberService = async (orderNumber: number): Promise<OrderDetailVM> => {
    return await getOrderDetailByOrderNumberRepository(orderNumber);
}

export const changeStatusOrderService = async (orderStatusId: number, orderId: number): Promise<ResponseMessages> => {
    const isValidStatusId = isValidSatusOrder(orderStatusId);
    if (!isValidStatusId) {
        const response = new ResponseMessages();
        response.setError(Errors.StatusNotFound);
        return response;
    }
    return await changeStatusOrderRepository(orderStatusId, orderId);
};

export const getOrderStatusService = async (): Promise<OrderStatusVM> => {
    return await getOrderStatusRepository();
};

export const saveOrderService = async (order: OrderDTO): Promise<SaveOrderResponse> => {
    const user = await getUserByNameRepository(order.CustomerName)
    const newOrder = mapOrderDTOToDB(order, user.Id);
    return await saveOrderRepository(newOrder, order.CartId, user)
}
