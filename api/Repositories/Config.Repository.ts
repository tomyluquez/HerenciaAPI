import { Op } from "sequelize";
import { CompanyInfoVM } from "../../Models/Company/CompanyInfo.model";
import CompanyInfo from "../../Database/Models/Company.Model";
import { mapCompanyInfoDBToVM, mapConfigDBToVM, mapCouponsDBToVM, mapMenuDBToVM } from "../../Helpers/Map/CompanyMap";
import { Errors } from "../../Enums/Errors.enum";
import { MenuVM } from "../../Models/Menu.model";
import Menu from "../../Database/Models/Menu.model";
import { SearchConfigDTO } from "../../Interfaces/Search/SearchConfig.interface";
import { ConfigVM } from "../../Models/Config/Config.model";
import Config from "../../Database/Models/Config.model";
import { ResponseMessages } from "../../Models/ResponseMessages.model";
import { SaveCompanyInfoDTO } from "../../Interfaces/Company/SaveCompany.interface";
import { Success } from "../../Enums/SuccessEnum";
import { SaveConfigDTO } from "../../Interfaces/Config/SaveConfig.interface";
import sequelize from "../../Database/connection";
import { IConfigVM } from "../../Interfaces/Config/Config.interface";
import { SearchCouponList } from "../../Interfaces/DiscountCoupon.interface";
import { DiscountCouponPagedListVM } from "../../Models/Order/DiscountCoupon.model";
import DiscountCoupon from "../../Database/Models/DiscountCoupon.model";
import { SaveCouponDTO } from "../../Interfaces/saveCoupon.interface";

export const getCompanyInfoRepository = async (IsActive: boolean | undefined): Promise<CompanyInfoVM> => {
    const response = new CompanyInfoVM();
    let filters: any = {};

    if (IsActive !== undefined) {
        filters = { IsActive };
    }

    const companyInfoDB = await CompanyInfo.findAll({ where: filters });

    if (companyInfoDB.length > 0) {
        response.Items = companyInfoDB.map(mapCompanyInfoDBToVM);
    } else {
        response.setError(Errors.CompanyInfoNotFound);
    }

    return response;
};

export const getMenuRepository = async (isAdmin: boolean | undefined): Promise<MenuVM> => {
    const response = new MenuVM();

    const menuDB = await Menu.findAll();

    if (menuDB.length > 0) {
        response.Items = menuDB.map(mapMenuDBToVM);

        if (!isAdmin) {
            response.Items = response.Items.filter((item) => !item.IsAdmin);
        }
    } else {
        response.setError(Errors.MenuNotFound);
    }

    return response;
};

export const getConfigRepository = async (search: SearchConfigDTO): Promise<ConfigVM> => {
    const response = new ConfigVM();
    const offset = (search.Pagination.Page - 1) * search.Pagination.Limit;

    const configDB = await Config.findAll({ offset, limit: search.Pagination.Limit });
    if (configDB.length > 0) {
        response.Items = configDB.map(mapConfigDBToVM);
        response.TotalItems = await Config.count();
    } else {
        response.setError(Errors.ConfigNotFound);
    }

    return response;
};

export const getDiscountCouponsRepository = async (search: SearchCouponList): Promise<DiscountCouponPagedListVM> => {
    const response = new DiscountCouponPagedListVM();
    const offset = (search.Pagination.Page - 1) * search.Pagination.Limit;

    const couponsDB = await DiscountCoupon.findAll({
        where: {
            ...(search.Name && { Name: { [Op.like]: `%${search.Name}%` } }),
            ...(search.Status && { IsActive: search.Status })
        },
        offset, limit: search.Pagination.Limit
    });
    if (couponsDB.length > 0) {
        response.Items = couponsDB.map(mapCouponsDBToVM);
        response.TotalItems = await DiscountCoupon.count();
    } else {
        response.setError(Errors.ConfigNotFound);
    }

    return response;
};

export const getFreeShippinhFromConfigRepository = async (id: number): Promise<IConfigVM> => {
    let response = {} as IConfigVM;

    const configDB = await Config.findOne({ where: { ...(id && { Id: id }) } });
    if (configDB) {
        response = configDB;
    } else {
        throw new Error(Errors.ConfigNotFound);
    }

    return response;
};



export const saveCompanyInfoRepository = async (bodyParams: SaveCompanyInfoDTO): Promise<ResponseMessages> => {
    const response = new ResponseMessages();
    if (!bodyParams.Id) {
        const newCompanyInfo = await CompanyInfo.create(bodyParams);
        if (newCompanyInfo) {
            response.setSuccess(Success.SaveCompanyInfo);
        } else {
            response.setError(Errors.CompanySave);
        }
    } else {
        const [affectedRow] = await CompanyInfo.update(bodyParams, {
            where: {
                Id: bodyParams.Id
            }
        });
        if (affectedRow > 0) {
            response.setSuccess(Success.UpdateCompanyInfo);
        } else {
            response.setError(Errors.CompanySave);
        }
    }
    return response;
};

export const saveConfigRepository = async (toSave: SaveConfigDTO): Promise<ResponseMessages> => {
    const response = new ResponseMessages();

    if (toSave.Id) {
        const [affectedRow] = await Config.update(
            {
                Value: toSave.Value,
            },
            {
                where: {
                    Id: toSave.Id
                }
            }
        );
        if (affectedRow > 0) {
            response.setSuccess(Success.UpdateSize);
        } else {
            response.setError(Errors.SizeSave);
        }
    } else {
        const newConfig = await Config.create(toSave);
        if (newConfig) {
            response.setSuccess(Success.SaveSize);
        } else {
            response.setError(Errors.SizeSave);
        }
    }

    return response;
};

export const saveCouponRepository = async (toSave: SaveCouponDTO): Promise<ResponseMessages> => {
    const response = new ResponseMessages();

    if (toSave.Id) {
        const [affectedRow] = await DiscountCoupon.update(
            {
                Discount: toSave.Discount,
            },
            {
                where: {
                    Id: toSave.Id
                }
            }
        );
        if (affectedRow > 0) {
            response.setSuccess(Success.UpdateCoupon);
        } else {
            response.setError(Errors.CouponSave);
        }
    } else {
        const newCoupon = await DiscountCoupon.create(toSave);
        if (newCoupon) {
            response.setSuccess(Success.SaveCoupon);
        } else {
            response.setError(Errors.CouponSave);
        }
    }

    return response;
};

export const getCompanyInfoIdByNameRepository = async (Name: string): Promise<number> => {
    const companyInfoDB = await CompanyInfo.findOne({
        where: {
            [Op.and]: [sequelize.where(sequelize.fn("LOWER", sequelize.col("Name")), Name)]
        }
    });
    if (companyInfoDB) {
        return companyInfoDB.Id!;
    } else {
        return 0;
    }
};
