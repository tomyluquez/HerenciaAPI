import { Request, Response } from "express";
import { CategoryListVM } from "../../Models/Category/CategotyList.model";
import { convertedStatusNumberFilter } from "../../Helpers/ConvertedFilters";
import { mapCategoriesSearchQueryToDTO } from "../../Helpers/Map/CategoryMap";
import { Errors } from "../../Enums/Errors.enum";
import { CategoryVM } from "../../Models/Category/CategoryVM.model";
import { ResponseMessages } from "../../Models/ResponseMessages.model";
import { FilteringOptionsCategoryListVM } from "../../Models/FilteringOptions/FilteringOptionsCategoryList.model";
import { changeStatusService, getAllCategoriesService, getCategoryByIdService, saveCategoryService } from "../Services/Category.service";

export const getAllCategories = async (req: Request, res: Response): Promise<void> => {
    const { status } = req.query;
    const IsActive = convertedStatusNumberFilter(Number(status));

    const search = mapCategoriesSearchQueryToDTO(req.query, IsActive);

    try {
        const response = await getAllCategoriesService(search); // Obtener la respuesta directamente del servicio
        res.status(200).send(response);
    } catch (error) {
        const response = new CategoryListVM(); // Crear una instancia solo en caso de error
        response.setError(Errors.Categories);
        res.status(500).send(response);
    }
};

export const getCategoryById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.query;
        if (!id) {
            throw new Error(Errors.IdRequired);
        }
        const response = await getCategoryByIdService(+id);
        res.status(200).send(response);
    } catch (error: any) {
        const response = new CategoryVM();
        response.setError(error.message || Errors.Categories);
        res.status(500).send(response);
    }
};

export const changeStatus = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.query;

        if (!id) {
            throw new Error(Errors.IdRequired);
        }

        const response = await changeStatusService(+id);
        res.status(200).send(response);
    } catch (error: any) {
        const response = new ResponseMessages();
        response.setError(error.message || Errors.CategoryChangeState);
        res.status(500).send(response);
    }
};

export const saveCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const response = await saveCategoryService(req.body);
        res.status(200).send(response);
    } catch (error: any) {
        const response = new ResponseMessages();
        response.setError(error.message || Errors.CategorySave);
        res.status(500).send(response);
    }
};

export const getFilteringOptionsCategoryList = async (req: Request, res: Response): Promise<void> => {
    const response = new FilteringOptionsCategoryListVM();
    try {
        res.status(200).send(response);
    } catch (error: any) {
        response.setError(error.message);
        res.status(500).send(response);
    }
};
