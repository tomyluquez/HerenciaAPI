import { IPagination } from "../../Interfaces/Pagination.interface";
import { PromotionalProductsVM } from "../../Models/Product/PromotionalProducts.model";
import { getPromocionalProductsRepository } from "../Repositories/Product.Repository";

export const getPromocionalProductsService = async (pagination: IPagination): Promise<PromotionalProductsVM> => {
    return await getPromocionalProductsRepository(pagination);
};