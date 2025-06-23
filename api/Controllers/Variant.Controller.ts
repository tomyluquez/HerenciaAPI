import { Request, Response } from "express";
import { getProductVariantsService, getProductsStockService, updateStockService } from "../Services/Variant.Service";
import { ProductVarinantsVM } from "../../Models/Product/ProdcutVariants.model";
import { Errors } from "../../Enums/Errors.enum";
import { mapDataToNameAndId, mapQueryProductsStockSearchToDTO, mapQueryProductVariantsSearchToDTO } from "../../Helpers/Map/VariantsMap";
import { FilteringOptionsProductStockVM } from "../../Models/FilteringOptions/FilteringOptionsProductStock.model";
import { getAllCategoriesService } from "../Services/Category.service";
import { getSizesListService } from "../Services/Size.Service";

export const getProductVariants = async (req: Request, res: Response): Promise<void> => {
    const { productId } = req.query;
    try {
        if (!productId) {
            throw new Error(Errors.IdRequired);
        }
        const search = mapQueryProductVariantsSearchToDTO(req.query);
        const response = await getProductVariantsService(search);
        res.status(200).send(response);
    } catch (error: any) {
        const response = new ProductVarinantsVM();
        response.setError(error.message || Errors.ProductVariants);
        res.status(500).send(response);
    }
};

export const getProductsStock = async (req: Request, res: Response): Promise<void> => {
    try {

        const search = mapQueryProductsStockSearchToDTO(req.query);
        const response = await getProductsStockService(search);
        res.status(200).send(response);
    } catch (error: any) {
        const response = new ProductVarinantsVM();
        response.setError(error.message || Errors.ProductVariants);
        res.status(500).send(response);
    }
};

export const getFilteringOptionsProductStock = async (req: Request, res: Response): Promise<void> => {
    const response = new FilteringOptionsProductStockVM();
    try {
        const categories = await getAllCategoriesService({ IsActive: true, Pagination: { Page: 1, Limit: 1000 }, Name: "" })
        const sizes = await getSizesListService({ Name: "", IsActive: true, Pagination: { Page: 1, Limit: 1000 } })
        response.addCategories(mapDataToNameAndId(categories.Items))
        response.addSizes(mapDataToNameAndId(sizes.Items))
        res.status(200).send(response);
    } catch (error: any) {
        response.setError(error.message || Errors.ProductVariants);
        res.status(500).send(response);
    }
};

export const updateStock = async (req: Request, res: Response): Promise<void> => {
    console.log(req.query)
    const { variantId, quantity } = req.query;
    try {
        if (!variantId) {
            throw new Error(Errors.IdRequired);
        }

        if (!quantity) {
            throw new Error(Errors.QuantityRequired);
        }

        const response = await updateStockService(+variantId, +quantity!);
        res.status(200).send(response);
    } catch (error: any) {
        const response = new ProductVarinantsVM();
        response.setError(error.message || Errors.UpdateStock);
        res.status(500).send(response);
    }
};
