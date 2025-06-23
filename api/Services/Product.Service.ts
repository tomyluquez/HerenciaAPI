import { Errors } from "../../Enums/Errors.enum";
import { IPagination } from "../../Interfaces/Pagination.interface";
import { IProductVM } from "../../Interfaces/Product/Product.interface";
import { UpdateAllPriceProductDTO, UpdatePriceProductDTO } from "../../Interfaces/Product/UpdatePriceProduct.interface";
import { GetAllProductsSearchDTO } from "../../Interfaces/Search/GelAllProductSearch.interface";
import { GetAllCategoriesSearchDTO } from "../../Interfaces/Search/GetAllCategoriesSearch.interface";
import { PriceListProductsSearchDTO } from "../../Interfaces/Search/PriceListProductSearch.interface";
import { ProductPagedListSearchDTO } from "../../Interfaces/Search/ProductPagedListSearch.interface";
import { HomeInfoResponse } from "../../Models/HomeInfo.model";
import { PriceListProductsVM } from "../../Models/Product/PriceListProduct.model";
import { Products } from "../../Models/Product/Product.model";
import { ProductPagedListVM } from "../../Models/Product/ProductPagedList.model";
import { ProductVM } from "../../Models/Product/ProductVM.model";
import { PromotionalProductsVM } from "../../Models/Product/PromotionalProducts.model";
import { ResponseMessages } from "../../Models/ResponseMessages.model";
import { existingProductWhitName } from "../../Validators/ProductValidator";
import { changeStatusRepsitory, getAllProductsRepository, getPriceListProductsRepository, getProductByIdRepository, getProductsPagedListRepository, getProductsRepository, getPromocionalProductsRepository, saveProductRepository, updateAllProductsPricetRepository, updatePriceProductRepository } from "../Repositories/Product.Repository";
import { getAllCategoriesService } from "./Category.service";

export const getAllProductsService = async (search: GetAllProductsSearchDTO): Promise<ProductVM> => {
    return await getAllProductsRepository(search);
};

export const getPromocionalProductsService = async (pagination: IPagination): Promise<PromotionalProductsVM> => {
    return await getPromocionalProductsRepository(pagination);
};

export const getProductsPagedListsService = async (search: ProductPagedListSearchDTO): Promise<ProductPagedListVM> => {
    return await getProductsPagedListRepository(search);
};

export const getProductsService = async (search: ProductPagedListSearchDTO): Promise<Products> => {
    return await getProductsRepository(search);
};

export const getProductByIdService = async (id: number): Promise<ProductVM> => {
    return await getProductByIdRepository(id);
};

export const changeStatusService = async (id: number, IsActive: boolean): Promise<ResponseMessages> => {
    return await changeStatusRepsitory(id, IsActive);
};

export const saveProductService = async (product: IProductVM): Promise<ResponseMessages> => {
    const existingProduct = await existingProductWhitName(product.Name, product.Id);

    if (existingProduct) {
        const response = new ResponseMessages();
        response.setError(Errors.ExistingName);
        return response;
    }

    return await saveProductRepository(product);
};

export const getPriceListProductsService = async (search: PriceListProductsSearchDTO): Promise<PriceListProductsVM> => {
    return await getPriceListProductsRepository(search);
};

export const updatePriceProductService = async (toUpdate: UpdatePriceProductDTO): Promise<ResponseMessages> => {
    return await updatePriceProductRepository(toUpdate);
};

export const updateAllProductsPriceService = async (toUpdate: UpdateAllPriceProductDTO): Promise<ResponseMessages> => {
    return await updateAllProductsPricetRepository(toUpdate);
};

export const getHomeInfoService = async (search: GetAllCategoriesSearchDTO): Promise<HomeInfoResponse> => {
    let response = new HomeInfoResponse();
    try {
        [response.Categories, response.PromotionalProducts] = await Promise.all([getAllCategoriesService(search), getPromocionalProductsService(search.Pagination)]);
    } catch (error: any) {
        response.setError(error.message || 'Error');
        return response;
    }

    return response;
}
