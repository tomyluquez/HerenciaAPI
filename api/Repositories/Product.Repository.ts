import Category from "../../Database/Models/Category.model";
import Product from "../../Database/Models/Product.model";
import ProductImages from "../../Database/Models/ProductImages.model";
import { mapPromotionalDBToVM } from "../../Helpers/Map/ProductMap";
import { IPagination } from "../../Interfaces/Pagination.interface";
import { PromotionalProductsVM } from "../../Models/Product/PromotionalProducts.model";

export const getPromocionalProductsRepository = async (pagination: IPagination): Promise<PromotionalProductsVM> => {
    const filters: any = { IsActive: true, IsPromotional: true };
    const products = new PromotionalProductsVM();

    const productsDB = await Product.findAll({
        where: filters,
        include: [
            {
                model: Category,
                as: "Category",
                attributes: ["Name"]
            },
            {
                model: ProductImages,
                as: "Images",
                attributes: ["Url"]
            }
        ],
        limit: pagination.Limit
    });

    if (productsDB.length > 0) {
        products.Items = productsDB.map(mapPromotionalDBToVM);
        products.TotalItems = await getTotalCountPromotionalProducts();
    } else {
        products.setWarning("No se encontraron productos");
    }

    return products;
};

export const getTotalCountPromotionalProducts = async (): Promise<number> => {
    const filters: any = { IsActive: true, IsPromotional: true };
    // Contar productos basados en las condiciones sin incluir asociaciones
    return await Product.count({
        where: filters,
        include: [
            {
                model: Category,
                as: "Category",
                attributes: ["Name"]
            },
            {
                model: ProductImages,
                as: "Images",
                attributes: ["Url"]
            }
        ],
        distinct: true
    });
};