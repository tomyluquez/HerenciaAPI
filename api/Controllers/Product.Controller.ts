import { Request, Response } from "express";
import { PromotionalProductsVM } from "../../Models/Product/PromotionalProducts.model";
import { mapPaginationQueryToDTO } from "../../Helpers/Map/PaginationMap";
import { Errors } from "../../Enums/Errors.enum";
import { getPromocionalProductsService } from "../Services/Product.Service";

export const getPromocionalProducts = async (req: Request, res: Response): Promise<void> => {

    const pagination = mapPaginationQueryToDTO(req.query);
    try {
        const response = await getPromocionalProductsService(pagination);
        res.status(200).send(response);
    } catch (error: any) {
        let response = new PromotionalProductsVM();
        response.setError(Errors.Products);
        res.status(500).send(response);
    }
};