import { Errors } from "../../Enums/Errors.enum";
import { ICategoryVM } from "../../Interfaces/Category/CategoryVM.interface";
import { GetAllCategoriesSearchDTO } from "../../Interfaces/Search/GetAllCategoriesSearch.interface";
import { CategoryVM } from "../../Models/Category/CategoryVM.model";
import { CategoryListVM } from "../../Models/Category/CategotyList.model";
import { ResponseMessages } from "../../Models/ResponseMessages.model";
import { validateHasProductsInCategory, validateIfExistsCategoryWhitName } from "../../Validators/CategoryValidators";
import { getAllCategoriesRepository, getCategoryByIdRepository, saveCategoryRepository } from "../Repositories/Category.Repository";
import { changeStatusRepsitory } from "../Repositories/Category.Repository";

export const getAllCategoriesService = async (search: GetAllCategoriesSearchDTO): Promise<CategoryListVM> => {
    return await getAllCategoriesRepository(search);
};

export const getCategoryByIdService = async (id: number): Promise<CategoryVM> => {
    return await getCategoryByIdRepository(id);
};

export const changeStatusService = async (id: number): Promise<ResponseMessages> => {
    const hasProducts = await validateHasProductsInCategory(id);
    if (hasProducts) {
        const response = new ResponseMessages();
        response.setError(Errors.CategoryWhitProducts);
        return response;
    }
    return await changeStatusRepsitory(id);
};

export const saveCategoryService = async (category: ICategoryVM): Promise<ResponseMessages> => {
    const existingCategoryWhitName = await validateIfExistsCategoryWhitName(category.Name, category.Id);

    if (existingCategoryWhitName) {
        const response = new ResponseMessages();
        response.setError(Errors.ExistingName);
        return response;
    }

    return await saveCategoryRepository(category);
};
