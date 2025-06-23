import { Request, Response } from "express";
import { convertedStatusNumberFilter } from "../../Helpers/ConvertedFilters";
import { mapSaveSizeBodyToDTO, mapSizeChangeStatusBodyToDTO, mapSizeListSearchQueryToDTO } from "../../Helpers/Map/SizeMap";
import { SizeLlistVM } from "../../Models/Size/SizeListVM.model";
import { Errors } from "../../Enums/Errors.enum";
import { ResponseMessages } from "../../Models/ResponseMessages.model";
import { SizeVM } from "../../Models/Size/SizeVM.model";
import { FilteringOptionsCategoryListVM } from "../../Models/FilteringOptions/FilteringOptionsCategoryList.model";
import { changeStatusService, getSizeByIdService, getSizesListService, saveSizeService } from "../Services/Size.Service";

export const getSizesList = async (req: Request, res: Response): Promise<void> => {
    const IsActive = convertedStatusNumberFilter(Number(req.query.status));
    const search = mapSizeListSearchQueryToDTO(req.query, IsActive);

    try {
        const response = await getSizesListService(search);
        res.status(200).send(response);
    } catch (error) {
        const response = new SizeLlistVM();
        response.setError(Errors.Size);
        res.status(500).send(response);
    }
};

export const changeStatus = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.query;
    try {
        if (!id) {
            throw new Error(Errors.IdRequired);
        }
        const toUpdate = mapSizeChangeStatusBodyToDTO(+id);
        const response = await changeStatusService(toUpdate);
        res.status(200).send(response);
    } catch (error: any) {
        const response = new SizeLlistVM();
        response.setError(error.message || Errors.SizeChangeStatus);
        res.status(500).send(response);
    }
};

export const saveSize = async (req: Request, res: Response): Promise<void> => {
    const saveParams = mapSaveSizeBodyToDTO(req.body);
    console.log(saveParams)
    try {
        const response = await saveSizeService(saveParams);
        res.status(200).send(response);
    } catch (error: any) {
        const response = new ResponseMessages();
        response.setError(Errors.SizeSave);
        res.status(500).send(response);
    }
};

export const getSizeById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.query;
    try {
        if (!id) {
            throw new Error(Errors.IdRequired);
        }
        const response = await getSizeByIdService(+id);
        res.status(200).send(response);
    } catch (error: any) {
        const response = new SizeVM();
        response.setError(error.message || Errors.Size);
        res.status(500).send(response);
    }
};

export const getFilteringOptionsSizeList = async (req: Request, res: Response): Promise<void> => {
    const response = new FilteringOptionsCategoryListVM();
    try {
        res.status(200).send(response);
    } catch (error: any) {
        response.setError(error.message);
        res.status(500).send(response);
    }
};