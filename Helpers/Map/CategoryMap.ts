import Category from "../../Database/Models/Category.model";
import { ICategoryVM } from "../../Interfaces/Category/CategoryVM.interface";
import { GetAllCategoriesSearchDTO } from "../../Interfaces/Search/GetAllCategoriesSearch.interface";
import { mapPaginationQueryToDTO } from "./PaginationMap";

export const mapCategoryDBToVM = (CategoryDB: Category): ICategoryVM => {
    const category = {
        Id: CategoryDB.Id || 0,
        Name: CategoryDB.Name,
        Image: CategoryDB.Image,
        IsActive: CategoryDB.IsActive,
        Products: CategoryDB.Products ? CategoryDB.Products : []
    };
    return category;
};

export const mapCategoriesSearchQueryToDTO = (query: any, IsActive: boolean | undefined): GetAllCategoriesSearchDTO => {
    return {
        Name: query.name,
        IsActive,
        Pagination: mapPaginationQueryToDTO(query)
    };
};
