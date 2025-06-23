import { Op } from "sequelize";
import { CompanyInfoVM } from "../../Models/Company/CompanyInfo.model";
import CompanyInfo from "../../Database/Models/Company.Model";
import { mapCompanyInfoDBToVM, mapConfigDBToVM, mapMenuDBToVM } from "../../Helpers/Map/CompanyMap";
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

export const saveConfigRepository = async (bodyParams: SaveConfigDTO[]): Promise<ResponseMessages> => {
    const response = new ResponseMessages();
    console.log(bodyParams);

    const config = await Config.bulkCreate(bodyParams, {
        updateOnDuplicate: ["Name", "Value"] // Si hay un duplicado, actualizar estos campos
    });

    if (config.length > 0) {
        response.setSuccess(Success.SaveConfig);
    } else {
        response.setError(Errors.ConfigSave);
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
