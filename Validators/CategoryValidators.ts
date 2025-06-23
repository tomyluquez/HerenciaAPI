import { getCategoryByIdRepository, getCategoryIdByNameRepository } from "../api/Repositories/Category.Repository";
import { CategoryVM } from "../Models/Category/CategoryVM.model";

export const validateHasProductsInCategory = async (id: number): Promise<boolean> => {
    const category: CategoryVM = await getCategoryByIdRepository(id, true);
    if (!category.Item?.IsActive) return false;

    return !category.hasErrors() && !category.hasWarnings() && !!(category.Item && category.Item.Products && category.Item.Products.length > 0);
};

export const validateIfExistsCategoryWhitName = async (name: string, categoryId = 0): Promise<boolean> => {
    const existingCategory = await getCategoryIdByNameRepository(name.toLowerCase());

    if (!existingCategory) return false;

    return existingCategory !== categoryId;
};
