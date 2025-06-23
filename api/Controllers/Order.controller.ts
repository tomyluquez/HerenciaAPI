import { Request, Response } from "express";
import { mapOrderSearchQueryToDTO } from "../../Helpers/Map/OrderMap";
import { OrderVM } from "../../Models/Order/OrderVM.model";
import { Errors } from "../../Enums/Errors.enum";
import { OrderDetailVM } from "../../Models/Order/OrderDetail.model";
import { OrderStatusVM } from "../../Models/Order/OrderStatus.model";
import { convertedStringToBoolean } from "../../Helpers/ConvertedFilters";
import { FilteringOptionsOrderPagedListVM } from "../../Models/FilteringOptions/FilteringOptionsPagedListOrder.model";
import { OrderDTO } from "../../Interfaces/Order/Order.interface";
import { SaveOrderResponse } from "../../Models/Order/SaveOrderResponse.model";
import { changeStatusOrderService, getOrderDetailByIdService, getOrderDetailByOrderNumberService, getOrdersService, getOrderStatusService, saveOrderService } from "../Services/Order.Service";

export const getOrders = async (req: Request, res: Response): Promise<void> => {
    const search = mapOrderSearchQueryToDTO(req.query);
    try {
        const response = await getOrdersService(search);
        res.status(200).send(response);
    } catch (error: any) {
        const response = new OrderVM();
        response.setError(error.message || Errors.Orders);
        res.status(error.message ? 400 : 500).send(response);
    }
};

export const getOrderDetailById = async (req: Request, res: Response): Promise<void> => {
    const { orderId } = req.query;
    try {
        if (!orderId) {
            throw new Error(Errors.IdRequired);
        }
        const response = await getOrderDetailByIdService(+orderId);
        res.status(200).send(response);
    } catch (error: any) {
        const response = new OrderDetailVM();
        response.setError(error.message || Errors.OrderChangeStatus);
        res.status(error.message ? 400 : 500).send(response);
    }
};

export const getOrderDetailByOrderNumber = async (req: Request, res: Response): Promise<void> => {
    const { orderNumber } = req.query;
    try {
        if (!orderNumber) {
            throw new Error(Errors.IdRequired);
        }
        const response = await getOrderDetailByOrderNumberService(+orderNumber);
        res.status(200).send(response);
    } catch (error: any) {
        const response = new OrderDetailVM();
        response.setError(error.message || Errors.OrderChangeStatus);
        res.status(error.message ? 400 : 500).send(response);
    }
};


export const changeStatusOrder = async (req: Request, res: Response): Promise<void> => {
    const { orderStatusId, orderId } = req.query;
    try {
        if (!orderStatusId || !orderId) {
            throw new Error(Errors.IdRequired);
        }
        const response = await changeStatusOrderService(+orderStatusId, +orderId);
        res.status(200).send(response);
    } catch (error: any) {
        const response = new OrderVM();
        response.setError(error.message || Errors.OrderChangeStatus);
        res.status(error.message ? 400 : 500).send(response);
    }
};

export const getOrderStatus = async (req: Request, res: Response): Promise<void> => {
    try {
        const response = await getOrderStatusService();
        res.status(200).send(response);
    } catch (error: any) {
        const response = new OrderStatusVM();
        response.setError(Errors.OrderStatus);
        res.status(error.message ? 400 : 500).send(response);
    }
};

export const getFilteringOptionsOrderList = async (req: Request, res: Response): Promise<void> => {
    const onlyOptions = convertedStringToBoolean(req.query.onlyOptions as string);
    const response = new FilteringOptionsOrderPagedListVM(onlyOptions);
    try {
        res.status(200).send(response);
    } catch (error: any) {
        response.setError(error.message || Errors.ProductVariants);
        res.status(500).send(response);
    }
};

export const saveOrder = async (req: Request, res: Response): Promise<void> => {
    const newOrder: OrderDTO = req.body;
    let response = new SaveOrderResponse();
    try {
        response = await saveOrderService(newOrder);
        res.status(200).send(response);
    } catch (error: any) {
        response.setError(error.message || Errors.SaveOrder);
        res.status(500).send(response);
    }
};

