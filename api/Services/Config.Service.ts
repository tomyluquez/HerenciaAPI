import { Errors } from "../../Enums/Errors.enum";
import { SaveCompanyInfoDTO } from "../../Interfaces/Company/SaveCompany.interface";
import { SaveConfigDTO } from "../../Interfaces/Config/SaveConfig.interface";
import { SearchCouponList } from "../../Interfaces/DiscountCoupon.interface";
import { SaveCouponDTO } from "../../Interfaces/saveCoupon.interface";
import { SearchConfigDTO } from "../../Interfaces/Search/SearchConfig.interface";
import { CompanyInfoVM } from "../../Models/Company/CompanyInfo.model";
import { ConfigVM } from "../../Models/Config/Config.model";
import { MenuVM } from "../../Models/Menu.model";
import { DiscountCouponPagedListVM } from "../../Models/Order/DiscountCoupon.model";
import { ResponseMessages } from "../../Models/ResponseMessages.model";
import { validateDuplicateNameConfig, validateIfExistsCompanyInfoWhitName } from "../../Validators/ConfigValidators";
import { getCompanyInfoRepository, getConfigRepository, getDiscountCouponsRepository, getMenuRepository, saveCompanyInfoRepository, saveConfigRepository, saveCouponRepository } from "../Repositories/Config.Repository";

export const getCompanyInfoService = async (IsActive: boolean | undefined): Promise<CompanyInfoVM> => {
    return await getCompanyInfoRepository(IsActive);
};

export const getMenuService = async (IsAdmin: boolean | undefined): Promise<MenuVM> => {
    return await getMenuRepository(IsAdmin);
};

export const getConfigService = async (search: SearchConfigDTO): Promise<ConfigVM> => {
    return await getConfigRepository(search);
};

export const saveCompanyInfoService = async (bodyParams: SaveCompanyInfoDTO): Promise<ResponseMessages> => {
    const isDuplicatedName = await validateIfExistsCompanyInfoWhitName(bodyParams.Name, bodyParams.Id);
    if (isDuplicatedName) {
        const response = new ResponseMessages();
        response.setError(Errors.ExistingName);
        return response;
    }
    return await saveCompanyInfoRepository(bodyParams);
};

export const getDiscountCouponsService = async (search: SearchCouponList): Promise<DiscountCouponPagedListVM> => {
    return await getDiscountCouponsRepository(search);
};

export const saveCouponService = async (toSave: SaveCouponDTO): Promise<ResponseMessages> => {
    return await saveCouponRepository(toSave);
};



export const saveConfigService = async (toSave: SaveConfigDTO): Promise<ResponseMessages> => {
    return await saveConfigRepository(toSave);
};
