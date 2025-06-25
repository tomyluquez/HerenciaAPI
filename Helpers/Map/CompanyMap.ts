import CompanyInfo from "../../Database/Models/Company.Model";
import Config from "../../Database/Models/Config.model";
import DiscountCoupon from "../../Database/Models/DiscountCoupon.model";
import Menu from "../../Database/Models/Menu.model";
import { ICompanyInfoVM } from "../../Interfaces/Company/CompanyInfo.interface";
import { SaveCompanyInfoDTO } from "../../Interfaces/Company/SaveCompany.interface";
import { IConfigVM } from "../../Interfaces/Config/Config.interface";
import { SaveConfigDTO } from "../../Interfaces/Config/SaveConfig.interface";
import { IDiscountCoupon } from "../../Interfaces/DiscountCoupon.interface";
import { IMenuVM } from "../../Interfaces/Menu.interface";
import { SaveCouponDTO } from "../../Interfaces/saveCoupon.interface";

export const mapCompanyInfoDBToVM = (companyInfoDB: CompanyInfo): ICompanyInfoVM => {
    return {
        Id: companyInfoDB.Id,
        Name: companyInfoDB.Name,
        Value: companyInfoDB.Value,
        Icon: companyInfoDB.Icon,
        IsActive: companyInfoDB.IsActive
    };
};

export const mapMenuDBToVM = (menuDB: Menu): IMenuVM => {
    return {
        Name: menuDB.Name,
        Icon: menuDB.Icon,
        Href: menuDB.Href,
        IsAdmin: menuDB.IsAdmin
    };
};

export const mapConfigDBToVM = (configDB: Config): IConfigVM => {
    return {
        Id: configDB.Id,
        Name: configDB.Name,
        Value: configDB.Value
    };
};

export const mapCouponsDBToVM = (couponDB: DiscountCoupon): IDiscountCoupon => {
    return {
        Id: couponDB.Id,
        Name: couponDB.Name,
        Discount: couponDB.Discount,
        DateCreated: couponDB.DateCreated.toISOString(),
        IsActive: couponDB.IsActive
    };
};

export const mapSaveCompanyInfoBodyToDTO = (body: any): SaveCompanyInfoDTO => {
    return {
        Id: body.Id || 0,
        Name: body.Name,
        Value: body.Value,
        Icon: body.Icon,
        IsActive: body.IsActive
    };
};

export const mapSaveConfigBodyToDTO = (body: any): SaveConfigDTO => {
    return {
        Id: body.Id || 0,
        Name: body.Name,
        Value: body.Value,
    };
};

export const mapSaveCouponBodyToDTO = (body: any): SaveCouponDTO => {
    return {
        Id: body.Id || 0,
        Name: body.Name,
        Discount: body.Discount,
        IsActive: body.IsActive
    };
};

