import { Request, Response } from "express";
import { PromotionalProductsVM } from "../../Models/Product/PromotionalProducts.model";
import { mapPaginationQueryToDTO } from "../../Helpers/Map/PaginationMap";
import { Errors } from "../../Enums/Errors.enum";
import { changeStatusService, getHomeInfoService, getPriceListProductsService, getProductByIdService, getProductsPagedListsService, getProductsService, getPromocionalProductsService, saveProductService, updateAllProductsPriceService, updatePriceProductService } from "../Services/Product.Service";
import { convertedFilters, convertedStatusNumberFilter } from "../../Helpers/ConvertedFilters";
import { ProductPagedListSearchDTO } from "../../Interfaces/Search/ProductPagedListSearch.interface";
import { mapPriceListProductsSearchQueryToDTO, mapProductPagedListQueryToDTO, mapUpdateAllPriceProductBodyToDTO, mapUpdatePriceProductBodyToDTO } from "../../Helpers/Map/ProductMap";
import { Products } from "../../Models/Product/Product.model";
import { ProductPagedListVM } from "../../Models/Product/ProductPagedList.model";
import { ProductVM } from "../../Models/Product/ProductVM.model";
import { ResponseMessages } from "../../Models/ResponseMessages.model";
import { PriceListProductsVM } from "../../Models/Product/PriceListProduct.model";
import { FilteringOptionsPagedListProductVM } from "../../Models/FilteringOptions/FilteringOptionPagedListProducts.model";
import { mapDataToNameAndId } from "../../Helpers/Map/VariantsMap";
import { FilteringOptionsPriceListVM } from "../../Models/FilteringOptions/FilteringOptionsPriceListProduct.model";
import { mapCategoriesSearchQueryToDTO } from "../../Helpers/Map/CategoryMap";
import { HomeInfoResponse } from "../../Models/HomeInfo.model";
import { getAllCategoriesService } from "../Services/Category.service";

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

export const getProductsToSale = async (req: Request, res: Response): Promise<void> => {
    const categories = convertedFilters(req.query.categories);
    const sizes = convertedFilters(req.query.sizes);
    const status = convertedStatusNumberFilter(Number(req.query.status));

    const search: ProductPagedListSearchDTO = mapProductPagedListQueryToDTO(req.query, categories, sizes, status);
    try {
        const response = await getProductsService(search);
        res.status(200).send(response);
    } catch (error: any) {
        const response = new Products();
        response.setError(Errors.Products);
        res.status(500).send(response);
    }
};

export const getProductsPagedLists = async (req: Request, res: Response): Promise<void> => {
    const categories = convertedFilters(req.query.categories);
    const sizes = convertedFilters(req.query.sizes);
    const status = convertedStatusNumberFilter(Number(req.query.status));

    const search: ProductPagedListSearchDTO = mapProductPagedListQueryToDTO(req.query, categories, sizes, status);
    try {
        const response = await getProductsPagedListsService(search);
        res.status(200).send(response);
    } catch (error: any) {
        const response = new ProductPagedListVM();
        response.setError(Errors.Products);
        res.status(500).send(response);
    }
};

export const getProductById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.query;

    try {
        if (!id) {
            throw new Error(Errors.IdRequired);
        }
        const response = await getProductByIdService(+id);
        res.status(200).send(response);
    } catch (error: any) {
        const response = new ProductVM();
        response.setError(error.message || Errors.Products);
        res.status(500).send(response);
    }
};

export const changeStatuts = async (req: Request, res: Response): Promise<void> => {
    try {
        const { status, id } = req.query;
        if (!id) {
            throw new Error(Errors.IdRequired);
        }
        if (!status) {
            throw new Error(Errors.StatusRequired);
        }
        let IsActive = convertedStatusNumberFilter(Number(status))!;

        const response = await changeStatusService(+id, IsActive);
        res.status(200).send(response);
    } catch (error: any) {
        const response = new ResponseMessages();
        response.setError(error.message || Errors.ProductChangeState);
        res.status(500).send(response);
    }
};

export const saveProduct = async (req: Request, res: Response): Promise<void> => {
    const product = req.body;

    try {
        const response = await saveProductService(product);
        res.status(200).send(response);
    } catch (error: any) {
        const response = new ProductVM();
        response.setError(error.message || Errors.Products);
        res.status(500).send(response);
    }
};

export const getPriceListProducts = async (req: Request, res: Response): Promise<void> => {
    const search = mapPriceListProductsSearchQueryToDTO(req.query);
    try {
        const response = await getPriceListProductsService(search);
        res.status(200).send(response);
    } catch (error: any) {
        const response = new PriceListProductsVM();
        response.setError(Errors.PriceListProducts);
        res.status(500).send(response);
    }
};

export const updatePriceProduct = async (req: Request, res: Response): Promise<void> => {
    const toUpdate = mapUpdatePriceProductBodyToDTO(req.query);
    try {
        const response = await updatePriceProductService(toUpdate);
        res.status(200).send(response);
    } catch (error: any) {
        const response = new PriceListProductsVM();
        response.setError(Errors.PriceListProducts);
        res.status(500).send(response);
    }
};

export const updateAllProductsPrice = async (req: Request, res: Response): Promise<void> => {
    const toUpdate = mapUpdateAllPriceProductBodyToDTO(req.query);
    console.log(toUpdate);
    try {
        const response = await updateAllProductsPriceService(toUpdate);
        res.status(200).send(response);
    } catch (error: any) {
        const response = new PriceListProductsVM();
        response.setError(Errors.PriceListProducts);
        res.status(500).send(response);
    }
};

export const getFilteringOptionsPagedListProduct = async (req: Request, res: Response): Promise<void> => {
    const response = new FilteringOptionsPagedListProductVM();
    try {
        const categories = await getAllCategoriesService({ IsActive: undefined, Pagination: { Page: 1, Limit: 1000 }, Name: "" })
        response.addCategories(mapDataToNameAndId(categories.Items))
        res.status(200).send(response);
    } catch (error: any) {
        response.setError(error.message || Errors.ProductVariants);
        res.status(500).send(response);
    }
};

export const getFilteringOptionsPriceList = async (req: Request, res: Response): Promise<void> => {
    const response = new FilteringOptionsPriceListVM();
    try {
        const categories = await getAllCategoriesService({ IsActive: true, Pagination: { Page: 1, Limit: 1000 }, Name: "" })
        response.addCategories(mapDataToNameAndId(categories.Items))
        res.status(200).send(response);
    } catch (error: any) {
        response.setError(error.message || Errors.ProductVariants);
        res.status(500).send(response);
    }
};

export const getHomeInfo = async (req: Request, res: Response): Promise<void> => {
    const { status } = req.query;
    const IsActive = convertedStatusNumberFilter(Number(status));

    const search = mapCategoriesSearchQueryToDTO(req.query, IsActive);

    try {
        const response = await getHomeInfoService(search); // Obtener la respuesta directamente del servicio
        res.status(200).send(response);
    } catch (error) {
        const response = new HomeInfoResponse(); // Crear una instancia solo en caso de error
        response.setError(Errors.Categories);
        res.status(500).send(response);
    }
};

