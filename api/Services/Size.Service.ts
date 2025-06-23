import { Errors } from "../../Enums/Errors.enum";
import { SizeListSearchDTO } from "../../Interfaces/Search/SizeListSearch.interface";
import { SaveSizeDTO } from "../../Interfaces/Size/SaveSize.interface";
import { SizeChangeStatusDTO } from "../../Interfaces/Size/SizeChangeStatus.interface";
import { ResponseMessages } from "../../Models/ResponseMessages.model";
import { SizeLlistVM } from "../../Models/Size/SizeListVM.model";
import { SizeVM } from "../../Models/Size/SizeVM.model";
import { validateHasProductsWhitSize, validateIfExistsSizeWhitName } from "../../Validators/SizeValidators";
import { changeStatusRepository, getSizeByIdRepository, getSizesListRepository, saveSizeRepository } from "../Repositories/Size.Repository";

export const getSizesListService = async (search: SizeListSearchDTO): Promise<SizeLlistVM> => {
    return await getSizesListRepository(search);
};

export const changeStatusService = async (toUpdate: SizeChangeStatusDTO): Promise<ResponseMessages> => {
    const hasProducts = await validateHasProductsWhitSize(toUpdate.Id);
    if (hasProducts) {
        const response = new ResponseMessages();
        response.setError(Errors.SizeWhitProducts);
        return response;
    }
    return await changeStatusRepository(toUpdate);
};

export const saveSizeService = async (toSave: SaveSizeDTO): Promise<ResponseMessages> => {
    const existingSizeWhitName = await validateIfExistsSizeWhitName(toSave.Name, toSave.Id);

    if (existingSizeWhitName) {
        const response = new ResponseMessages();
        response.setError(Errors.ExistingName);
        return response;
    }

    return await saveSizeRepository(toSave);
};

export const getSizeByIdService = async (id: number): Promise<SizeVM> => {
    return await getSizeByIdRepository(id);
};
