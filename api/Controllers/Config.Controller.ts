import { Request, Response } from "express";
import { getCompanyInfoService, getConfigService, getDiscountCouponsService, getMenuService, saveCompanyInfoService, saveConfigService, saveCouponService } from "../Services/Config.Service";
import { CompanyInfoVM } from "../../Models/Company/CompanyInfo.model";
import { convertedStatusFilter, convertedStatusNumberFilter, convertedUserRoleFilter } from "../../Helpers/ConvertedFilters";
import { Errors } from "../../Enums/Errors.enum";
import { MenuVM } from "../../Models/Menu.model";
import { mapQueryConfigSearchToDTO, mapQueryCouponSearchToDTO } from "../../Helpers/Map/ConfigMap";
import { ConfigVM } from "../../Models/Config/Config.model";
import { mapSaveCompanyInfoBodyToDTO, mapSaveConfigBodyToDTO, mapSaveCouponBodyToDTO } from "../../Helpers/Map/CompanyMap";
import { ResponseMessages } from "../../Models/ResponseMessages.model";
import { DiscountCouponPagedListVM } from "../../Models/Order/DiscountCoupon.model";

export const getCompanyInfo = async (req: Request, res: Response): Promise<void> => {
    const { status } = req.query;
    const IsActive = convertedStatusFilter(status as string);
    try {
        const response = await getCompanyInfoService(IsActive);
        res.status(200).json(response);
    } catch (error: any) {
        const response = new CompanyInfoVM();
        response.setError(Errors.CompanyInfo);
        res.status(error.message ? 400 : 500).send(response);
    }
};

export const getMenu = async (req: Request, res: Response): Promise<void> => {
    const { userRole } = req.query;
    const IsAdmin = convertedUserRoleFilter(Number(userRole));
    try {
        const response = await getMenuService(IsAdmin);
        res.status(200).json(response);
    } catch (error: any) {
        const response = new MenuVM();
        response.setError(Errors.Menu);
        res.status(error.message ? 400 : 500).send(response);
    }
};

export const getConfig = async (req: Request, res: Response): Promise<void> => {
    const search = mapQueryConfigSearchToDTO(req.query)
    try {
        const response = await getConfigService(search);
        res.status(200).json(response);
    } catch (error: any) {
        const response = new ConfigVM();
        response.setError(Errors.Config);
        res.status(error.message ? 400 : 500).send(response);
    }
};

export const saveCompanyInfo = async (req: Request, res: Response): Promise<void> => {
    const body = req.body;
    body.IsActive = convertedStatusFilter(body.IsActive as string);
    const bodyParams = mapSaveCompanyInfoBodyToDTO(body);

    try {
        const response = await saveCompanyInfoService(bodyParams);
        res.status(200).json(response);
    } catch (error: any) {
        const response = new ResponseMessages();
        response.setError(error.message || Errors.CompanyInfo);
        res.status(error.message ? 400 : 500).send(response);
    }
};

export const getDiscountCoupons = async (req: Request, res: Response): Promise<void> => {
    const IsActive = convertedStatusNumberFilter(Number(req.query.status));
    const search = mapQueryCouponSearchToDTO(req.query, IsActive)
    try {
        const response = await getDiscountCouponsService(search);
        res.status(200).json(response);
    } catch (error: any) {
        const response = new DiscountCouponPagedListVM();
        response.setError(Errors.Config);
        res.status(error.message ? 400 : 500).send(response);
    }
};


export const saveCoupon = async (req: Request, res: Response): Promise<void> => {
    const body = req.body;
    const toSave = mapSaveCouponBodyToDTO(body);

    try {
        const response = await saveCouponService(toSave);
        res.status(200).json(response);
    } catch (error: any) {
        const response = new ResponseMessages();
        response.setError(error.message || Errors.Config);
        res.status(error.message ? 400 : 500).send(response);
    }
};


export const saveConfigInfo = async (req: Request, res: Response): Promise<void> => {
    const body = req.body;
    const toSave = mapSaveConfigBodyToDTO(body);

    try {
        const response = await saveConfigService(toSave);
        res.status(200).json(response);
    } catch (error: any) {
        const response = new ResponseMessages();
        response.setError(error.message || Errors.Config);
        res.status(error.message ? 400 : 500).send(response);
    }
};
