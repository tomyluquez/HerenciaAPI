import { getCompanyInfoIdByNameRepository } from "../api/Repositories/Config.Repository";
import { SaveConfigDTO } from "../Interfaces/Config/SaveConfig.interface";

export const validateIfExistsCompanyInfoWhitName = async (name: string, companyInfoId = 0): Promise<boolean> => {
    const existingConfig = await getCompanyInfoIdByNameRepository(name.toLowerCase());

    if (!existingConfig) return false;

    return existingConfig !== companyInfoId;
};

export const validateDuplicateNameConfig = (newConfig: SaveConfigDTO[]): boolean => {
    const names = newConfig.map((config) => config.Name);
    return names.length !== new Set(names).size;
};
