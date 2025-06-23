import Size from "../../Database/Models/Size.model";
import { SizeListSearchDTO } from "../../Interfaces/Search/SizeListSearch.interface";
import { SaveSizeDTO } from "../../Interfaces/Size/SaveSize.interface";
import { SizeChangeStatusDTO } from "../../Interfaces/Size/SizeChangeStatus.interface";
import { ISizeListVM } from "../../Interfaces/Size/SizeList.interface";
import { mapPaginationQueryToDTO } from "./PaginationMap";

export const mapSizeListSearchQueryToDTO = (query: any, IsActive: boolean | undefined): SizeListSearchDTO => {
    return {
        Name: query.name,
        IsActive: IsActive,
        Pagination: mapPaginationQueryToDTO(query)
    };
};

export const mapSizesDBToVM = (size: Size): ISizeListVM => {
    return {
        Id: size.Id,
        Name: size.Name,
        IsActive: size.IsActive
    };
};

export const mapSizeChangeStatusBodyToDTO = (id: number): SizeChangeStatusDTO => {
    return {
        Id: Number(id),
    };
};

export const mapSaveSizeBodyToDTO = (body: any): SaveSizeDTO => {
    return {
        Id: Number(body.Id) || 0,
        Name: body.Name,
    };
};
