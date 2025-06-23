import { Op } from "sequelize";
import { IProductVariantsSearchDTO } from "../../Interfaces/Search/ProductVariantSearch.interface";
import { ProductVarinantsVM } from "../../Models/Product/ProdcutVariants.model";
import Variant from "../../Database/Models/Variant.model";
import Size from "../../Database/Models/Size.model";
import { mapProductsStockDBToVM, mapVariantDBToSize, mapVariantsProductDBToVM } from "../../Helpers/Map/VariantsMap";
import { SearchProductsStockPagedListDTO } from "../../Interfaces/Search/ProductStockPagedListSearch.interface";
import { ProductStockVM } from "../../Models/Product/ProductStock.model";
import Product from "../../Database/Models/Product.model";
import { ResponseMessages } from "../../Models/ResponseMessages.model";
import { Errors } from "../../Enums/Errors.enum";
import { Success } from "../../Enums/SuccessEnum";
import { IProductVariants } from "../../Interfaces/Product/ProductVariants.interface";
import { ISizeListVM } from "../../Interfaces/Size/SizeList.interface";

export const getProductVariantsRepository = async (search: IProductVariantsSearchDTO): Promise<ProductVarinantsVM> => {
    const productVariants = new ProductVarinantsVM();
    const offset = (search.Pagination.Page - 1) * search.Pagination.Limit;

    const variantsDB = await Variant.findAll({
        where: { ProductId: search.ProductId },
        include: [
            {
                model: Size,
                as: "Size",
                attributes: ["Name"],
                where: { IsActive: true }
            }
        ],
        offset,
        limit: search.Pagination.Limit
    });

    if (variantsDB.length > 0) {
        productVariants.Items = variantsDB.map(mapVariantsProductDBToVM);
        productVariants.TotalItems = await Variant.count({
            where: { ProductId: search.ProductId },
        });
    } else {
        productVariants.setWarning("No se encontraron variantes");
    }

    return productVariants;
};

export const getProductsStockRepository = async (search: SearchProductsStockPagedListDTO): Promise<ProductStockVM> => {
    const productVariants = new ProductStockVM();
    const offset = (search.Pagination.Page - 1) * search.Pagination.Limit;

    const variantsDB = await Variant.findAll({
        include: [
            {
                model: Size,
                as: "Size",
                attributes: ["Name"],
                where: {
                    IsActive: true,
                    ...(search.SizeId && { Id: search.SizeId })
                }
            },
            {
                model: Product,
                as: "Product",
                attributes: ["Name", "Cost"],
                where: {
                    ...(search.Status !== undefined && { IsActive: search.Status }),
                    ...(search.CategoryId && { CategoryId: search.CategoryId }),
                    ...(search.ProductName && { Name: { [Op.like]: `%${search.ProductName}%` } })
                }
            }
        ],
        offset,
        limit: search.Pagination.Limit
    });

    if (variantsDB.length > 0) {
        productVariants.Items = variantsDB.map(mapProductsStockDBToVM);
        productVariants.TotalItems = await Variant.count({
            include: [
                {
                    model: Size,
                    as: "Size",
                    attributes: ["Name"],
                    where: {
                        IsActive: true,
                        ...(search.SizeId && { Id: search.SizeId })
                    }
                },
                {
                    model: Product,
                    as: "Product",
                    attributes: ["Name", "Cost"],
                    where: {
                        ...(search.Status !== undefined && { IsActive: search.Status }),
                        ...(search.ProductName && { Name: { [Op.like]: `%${search.ProductName}%` } })
                    }
                }
            ],
        });
    } else {
        productVariants.setWarning("No se encontraron variantes");
    }

    return productVariants;
};

export const updateStockRepository = async (id: number, quantity: number): Promise<ResponseMessages> => {
    const response = new ResponseMessages();
    const [affectedRows] = await Variant.update({ Stock: quantity }, { where: { Id: id } });

    if (affectedRows === 0) {
        response.setError(Errors.UpdateStock);
        return response;
    }

    response.setSuccess(Success.UpdateStock);
    return response;
};

export const getVariantByIdRepository = async (id: number): Promise<IProductVariants | null> => {
    const variantDB = await Variant.findOne({
        where: { Id: id },
        include: [
            {
                model: Product,
                as: "Product",
                attributes: ["Name", "Price"]
            },
            {
                model: Size,
                as: "Size",
                attributes: ["Name"]
            }
        ]
    });
    if (!variantDB) return null;
    const variant = mapVariantsProductDBToVM(variantDB);
    return variant;
};

export const getVariantBySizeIdRepository = async (sizeId: number): Promise<ISizeListVM | null> => {
    const variantDB = await Variant.findOne({
        include: [
            {
                model: Size,
                as: "Size",
                where: { Id: sizeId, IsActive: true }
            }
        ]
    });
    if (!variantDB) return null;
    const size = mapVariantDBToSize(variantDB);
    return size;
};