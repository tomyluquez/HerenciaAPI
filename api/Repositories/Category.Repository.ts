import { Op } from "sequelize";
import { GetAllCategoriesSearchDTO } from "../../Interfaces/Search/GetAllCategoriesSearch.interface";
import { CategoryListVM } from "../../Models/Category/CategotyList.model";
import Category from "../../Database/Models/Category.model";
import { mapCategoryDBToVM } from "../../Helpers/Map/CategoryMap";
import { CategoryVM } from "../../Models/Category/CategoryVM.model";
import Product from "../../Database/Models/Product.model";
import { Errors } from "../../Enums/Errors.enum";
import sequelize from "../../Database/connection";
import { ResponseMessages } from "../../Models/ResponseMessages.model";
import { Success } from "../../Enums/SuccessEnum";
import { ICategoryVM } from "../../Interfaces/Category/CategoryVM.interface";

export const getAllCategoriesRepository = async (search: GetAllCategoriesSearchDTO): Promise<CategoryListVM> => {
    const categories = new CategoryListVM();
    const offset = (search.Pagination.Page - 1) * search.Pagination.Limit;
    let filters: any = {};

    if (search.IsActive !== undefined) {
        filters = { IsActive: search.IsActive };
    }
    if (search.Name) {
        filters = { ...filters, Name: { [Op.like]: `%${search.Name}%` } };
    }

    const categoriesDB = await Category.findAll({
        where: filters,
        order: [["Name", "ASC"]],
        offset,
        limit: search.Pagination.Limit
    });
    if (categoriesDB.length > 0) {
        categories.Items = categoriesDB.map(mapCategoryDBToVM);
        categories.TotalItems = await Category.count({ where: filters });
    } else {
        categories.setWarning("No se encontraron categorías");
    }

    return categories;
};

export const getCategoryByIdRepository = async (id: number, includeProducts = false): Promise<CategoryVM> => {
    const category = new CategoryVM();
    const filters: any = { where: { Id: id } };

    if (includeProducts) {
        filters.include = [{ model: Product, as: "Products" }];
    }

    const categoryDB = await Category.findOne(filters);
    if (categoryDB) {
        category.AddCategory(mapCategoryDBToVM(categoryDB));
    } else {
        category.setError(Errors.CategoryNotFound);
    }
    console.log(category);
    return category;
};

export const getCategoryIdByNameRepository = async (Name: string): Promise<number> => {
    const categoryDB = await Category.findOne({
        where: {
            [Op.and]: [sequelize.where(sequelize.fn("LOWER", sequelize.col("Name")), Name)]
        }
    });
    if (categoryDB) {
        return categoryDB.Id!;
    } else {
        return 0;
    }
};

export const changeStatusRepsitory = async (Id: number) => {
    let response = new ResponseMessages();
    try {
        const [affectedRows] = await Category.update(
            { IsActive: sequelize.literal('NOT IsActive') }, // Valores a actualizar
            { where: { Id } } // Condición de búsqueda
        );

        // Verificamos si se actualizó alguna fila
        if (affectedRows === 0) {
            throw new Error(Errors.Category);
        }

        response.setSuccess(Success.UpdateCategory);
    } catch (error: any) {
        response.setError(error.message);
    }
    return response;
};

export const saveCategoryRepository = async (category: ICategoryVM): Promise<ResponseMessages> => {
    const response = new ResponseMessages();
    if (category.Id) {
        const [affectedRows] = await Category.update(category, { where: { Id: category.Id } });
        if (affectedRows === 0) {
            response.setError(Errors.CategorySave);
            return response;
        }
    } else {
        const newCategory = await Category.create(category);
        if (!newCategory) {
            response.setError(Errors.CategorySave);
            return response;
        }
    }
    response.setSuccess(Success.SaveCategory);
    return response;
};
