import { SearchProductsStockPagedListDTO } from "../../Interfaces/Search/ProductStockPagedListSearch.interface";
import { IProductVariantsSearchDTO } from "../../Interfaces/Search/ProductVariantSearch.interface";
import { ProductVarinantsVM } from "../../Models/Product/ProdcutVariants.model";
import { ResponseMessages } from "../../Models/ResponseMessages.model";
import { getProductsStockRepository, getProductVariantsRepository, getVariantByIdRepository, updateStockRepository } from "../Repositories/Variant.Repository";

export const getProductVariantsService = async (search: IProductVariantsSearchDTO): Promise<ProductVarinantsVM> => {
    return await getProductVariantsRepository(search);
};

export const getProductsStockService = async (search: SearchProductsStockPagedListDTO): Promise<ProductVarinantsVM> => {
    return await getProductsStockRepository(search);
};


export const updateStockService = async (variantId: number, quantity: number): Promise<ResponseMessages> => {
    return await updateStockRepository(variantId, quantity);
};

export const stockByVariantIdService = async (variantId: number): Promise<number> => {
    const variant = await getVariantByIdRepository(variantId);
    return variant ? variant.Stock : 0;
};
