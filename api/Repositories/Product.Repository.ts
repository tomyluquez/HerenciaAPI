import { Op, Order, Sequelize } from "sequelize";
import Category from "../../Database/Models/Category.model";
import Product from "../../Database/Models/Product.model";
import ProductImages from "../../Database/Models/ProductImages.model";
import { mapPriceListProductsDBToVM, mapProductDBToProductPagedListVM, mapProductDBToProductVM, mapProductDBToVM, MapProductVMToProductDB, mapPromotionalDBToVM } from "../../Helpers/Map/ProductMap";
import { IPagination } from "../../Interfaces/Pagination.interface";
import { GetAllProductsSearchDTO } from "../../Interfaces/Search/GelAllProductSearch.interface";
import { ProductPagedListSearchDTO } from "../../Interfaces/Search/ProductPagedListSearch.interface";
import { ProductPagedListVM } from "../../Models/Product/ProductPagedList.model";
import { ProductVM } from "../../Models/Product/ProductVM.model";
import { PromotionalProductsVM } from "../../Models/Product/PromotionalProducts.model";
import Variant from "../../Database/Models/Variant.model";
import { Errors } from "../../Enums/Errors.enum";
import { Products } from "../../Models/Product/Product.model";
import Size from "../../Database/Models/Size.model";
import { ResponseMessages } from "../../Models/ResponseMessages.model";
import { Success } from "../../Enums/SuccessEnum";
import { IProductVM } from "../../Interfaces/Product/Product.interface";
import sequelize from "../../Database/connection";
import { PriceListProductsSearchDTO } from "../../Interfaces/Search/PriceListProductSearch.interface";
import { PriceListProductsVM } from "../../Models/Product/PriceListProduct.model";
import { UpdateAllPriceProductDTO, UpdatePriceProductDTO } from "../../Interfaces/Product/UpdatePriceProduct.interface";
import { ActionTypePriceListEnum } from "../../Enums/ActionTypePriceListEnum";

export const getAllProductsRepository = async (search: GetAllProductsSearchDTO): Promise<ProductVM> => {
    const offset = (search.Pagination.Page - 1) * search.Pagination.Limit;
    const productsDB = await Product.findAll({
        where: {
            ...(search.Name && { Name: { [Op.like]: `%${search.Name}%` } }),
            ...(search.IsActive && { IsActive: search.IsActive })
        },
        include: [
            {
                model: Category,
                as: "Category",
                attributes: ["Name"],
                ...(search.Categories.length > 0 && {
                    where: { Name: { [Op.in]: search.Categories } }
                })
            },
            {
                model: Variant,
                as: "Variants",
                attributes: ["Stock"],
                include: [
                    {
                        model: Size,
                        as: "Size",
                        attributes: ["Name"]
                    }
                ]
            },
            {
                model: ProductImages,
                as: "Images",
                attributes: ["Url"]
            }
        ],
        offset,
        limit: search.Pagination.Limit
    });
    const products = new ProductVM();

    if (productsDB.length > 0) {
        products.Items = productsDB.map(mapProductDBToVM);
        products.TotalItems = await getTotalCountProducts(search);
        return products;
    } else {
        products.setWarning("No se encontraron productos");
    }

    return products;
};

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

export const getProductsPagedListRepository = async (search: ProductPagedListSearchDTO): Promise<ProductPagedListVM> => {
    const offset = (search.Pagination.Page - 1) * search.Pagination.Limit;
    let order: Order = [["Name", "ASC"]];

    if (search.Order) {
        if (search.Order === "desc") {
            order = [["Name", "DESC"]];
        }

        if (search.Order === "lower") {
            order = [["Price", "ASC"]];
        }

        if (search.Order === "higher") {
            order = [["Price", "DESC"]];
        }
    }
    const products = new ProductPagedListVM();
    const productsDB = await Product.findAll({
        where: {
            ...(search.Name && { Name: { [Op.like]: `%${search.Name}%` } }),
            ...(search.Status !== undefined && { IsActive: search.Status }),
        },
        include: [
            {
                model: Category,
                as: "Category",
                attributes: ["Name"],
                ...(search.Categories.length > 0 && {
                    where: { Name: { [Op.in]: search.Categories } }
                })
            },
            {
                model: Variant,
                as: "Variants",
                attributes: ["Stock"],
                ...(search.Sizes.length > 0 && { where: { SizeId: { [Op.in]: search.Sizes } } })
            },
            {
                model: ProductImages,
                as: "Images",
                order: [["Id", "ASC"]],
                attributes: ["Url"]
            }
        ],
        offset,
        limit: search.Pagination.Limit,
        order
    });
    if (productsDB.length > 0) {
        products.Items = productsDB.map(mapProductDBToProductPagedListVM);
        products.TotalItems = await getTotalCountProductsPagedList(search);
    } else products.setWarning(Errors.ProductsNotFound);

    return products;
};
export const getProductsRepository = async (search: ProductPagedListSearchDTO): Promise<Products> => {
    const offset = (search.Pagination.Page - 1) * search.Pagination.Limit;
    let order: Order = [["Name", "ASC"]];

    if (search.Order) {
        if (search.Order === "desc") {
            order = [["Name", "DESC"]];
        }

        if (search.Order === "lower") {
            order = [["Price", "ASC"]];
        }

        if (search.Order === "higher") {
            order = [["Price", "DESC"]];
        }
    }
    const products = new Products();
    const productsDB = await Product.findAll({
        where: {
            ...(search.Name && { Name: { [Op.like]: `%${search.Name}%` } }),
            ...(search.Status !== undefined && { IsActive: search.Status }),
        },
        include: [
            {
                model: Category,
                as: "Category",
                attributes: ["Name"],
                ...(search.Categories.length > 0 && {
                    where: { Name: { [Op.in]: search.Categories } }
                })
            },
            {
                model: Variant,
                as: "Variants",
                attributes: ["Stock"],
                ...(search.Sizes.length > 0 && { where: { SizeId: { [Op.in]: search.Sizes } } })
            },
            {
                model: ProductImages,
                as: "Images",
                order: [["Id", "ASC"]],
                attributes: ["Url"]
            }
        ],
        offset,
        limit: search.Pagination.Limit,
        order
    });
    if (productsDB.length > 0) {
        products.Items = productsDB.map(mapProductDBToProductVM);
        products.TotalItems = await getTotalCountProductsPagedList(search);
    } else products.setWarning(Errors.ProductsNotFound);

    return products;
};

export const getTotalCountProductsPagedList = async (search: ProductPagedListSearchDTO): Promise<number> => {
    // Construir condiciones de búsqueda
    const whereConditions: any = { IsActive: true };

    if (search.Name) {
        whereConditions.Name = { [Op.like]: `%${search.Name}%` };
    }

    // Aplicar filtros para las asociaciones
    if (search.Categories.length > 0) {
        whereConditions["$Category.Name$"] = { [Op.in]: search.Categories };
    }

    if (search.Sizes.length > 0) {
        whereConditions["$Variants.SizeId$"] = { [Op.in]: search.Sizes };
    }

    // Contar productos basados en las condiciones sin incluir asociaciones
    return await Product.count({
        where: whereConditions,
        include: [
            {
                model: Category,
                as: "Category",
                attributes: [],
                required: search.Categories.length > 0
            },
            {
                model: Variant,
                as: "Variants",
                attributes: [],
                required: search.Sizes.length > 0
            }
        ],
        distinct: true
    });
};

export const getTotalCountProducts = async (search: GetAllProductsSearchDTO): Promise<number> => {
    // Contar productos basados en las condiciones sin incluir asociaciones
    return await Product.count({
        where: {
            ...(search.Name && { Name: { [Op.like]: `%${search.Name}%` } }),
            ...(search.IsActive && { IsActive: search.IsActive })
        },
        include: [
            {
                model: Category,
                as: "Category",
                attributes: ["Name"],
                ...(search.Categories.length > 0 && {
                    where: { Name: { [Op.in]: search.Categories } }
                })
            },
            {
                model: Variant,
                as: "Variants",
                attributes: ["Stock"],
                include: [
                    {
                        model: Size,
                        as: "Size",
                        attributes: ["Name"]
                    }
                ]
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

export const getProductByIdRepository = async (id: number): Promise<ProductVM> => {
    const product = new ProductVM();
    const productDB = await Product.findAll({
        where: {
            Id: id
        },
        include: [
            {
                model: Category,
                as: "Category",
                attributes: ["Name"]
            },
            {
                model: Variant,
                as: "Variants",
                attributes: ["Id", "Stock"],
                include: [
                    {
                        model: Size,
                        as: "Size",
                        attributes: ["Name", "Id"],
                        order: [["SizeId", "ASC"]]
                    }
                ]
            },
            {
                model: ProductImages,
                as: "Images",
                attributes: ["Url"]
            }
        ]
    });

    if (productDB.length > 0) {
        product.Items = productDB.map(mapProductDBToVM);
        return product;
    } else {
        product.setWarning("No se encontraron productos");
    }

    return product;
};

export const changeStatusRepsitory = async (Id: number, IsActive: boolean) => {
    let response = new ResponseMessages();
    try {
        const [affectedRows] = await Product.update(
            { IsActive }, // Valores a actualizar
            { where: { Id } } // Condición de búsqueda
        );

        // Verificamos si se actualizó alguna fila
        if (affectedRows === 0) {
            throw new Error(Errors.ProductNotFound);
        }

        response.setSuccess(Success.UpdateProduct);
    } catch (error: any) {
        response.setError(error.message);
    }
    return response;
};

export const getProductIdByNameRepository = async (Name: string): Promise<number> => {
    const productDB = await Product.findOne({ where: { Name } });
    if (productDB) {
        return productDB.Id!;
    } else {
        return 0;
    }
};

export const saveProductRepository = async (product: IProductVM): Promise<ResponseMessages> => {
    const transaction = await sequelize.transaction();
    const response = new ResponseMessages();
    const productToDb = MapProductVMToProductDB(product);
    if (product.Id) {
        const [affectedRows] = await Product.update(
            {
                ...productToDb,
                DateUpdated: new Date()
            },
            { where: { Id: product.Id }, transaction }
        );
        const existingVariants = await Variant.findAll({
            where: { ProductId: product.Id },
            transaction
        });

        if (productToDb.Variants && productToDb.Variants.length > 0) {
            const variantsToCreate = [];
            const variantsToUpdate = [];
            const existingVariantIds = new Set(existingVariants.map((v) => v.Id));
            const incomingVariantIds = new Set();

            for (const variant of productToDb.Variants) {
                if (variant.Id && existingVariantIds.has(variant.Id)) {
                    // Es una variante existente, actualizarla
                    variantsToUpdate.push(variant);
                    incomingVariantIds.add(variant.Id);
                } else {
                    // Es una variante nueva, crearla
                    variantsToCreate.push({
                        ProductId: productToDb.Id!,
                        SizeId: variant.SizeId!,
                        Stock: variant.Stock!
                    });
                }
            }

            if (variantsToUpdate.length > 0) {
                for (const variant of variantsToUpdate) {
                    await Variant.update(
                        {
                            SizeId: variant.SizeId,
                            Stock: variant.Stock
                        },
                        { where: { Id: variant.Id }, transaction }
                    );
                }
            }

            // Crear nuevas variantes
            if (variantsToCreate.length > 0) {
                await Variant.bulkCreate(variantsToCreate, { transaction });
            }

            // Eliminar variantes que ya no están en la lista de entrada
            const variantsToDelete = existingVariants.filter((v) => !incomingVariantIds.has(v.Id));

            if (variantsToDelete.length > 0) {
                const variantIdsToDelete = variantsToDelete.map((v) => v.Id);
                await Variant.destroy({
                    where: { Id: variantIdsToDelete },
                    transaction
                });
            }

            // Eliminar imágenes anteriores
            await ProductImages.destroy({
                where: { ProductId: product.Id },
                transaction
            });

            // Insertar nuevas imágenes
            if (product.Images && product.Images.length > 0) {
                const imagesToInsert = product.Images.map(url => ({
                    ProductId: product.Id!,
                    Url: url
                }));

                await ProductImages.bulkCreate(imagesToInsert, { transaction });
            }

            await transaction.commit(); // Confirmar la transacción
        }

        if (affectedRows === 0) {
            response.setError(Errors.ProductSave);
            return response;
        }
    } else {
        const newproduct = await Product.create(productToDb, { transaction });
        if (productToDb.Variants && productToDb.Variants.length > 0) {
            const variantsToCreate = productToDb.Variants.map((variant) => ({
                SizeId: variant.SizeId!,
                Stock: variant.Stock!,
                ProductId: newproduct.Id!
            }));

            await Variant.bulkCreate(variantsToCreate, { transaction });
        }

        if (product.Images && product.Images.length > 0) {
            const imagesToInsert = product.Images.map(url => ({
                ProductId: newproduct.Id!,
                Url: url
            }));

            await ProductImages.bulkCreate(imagesToInsert, { transaction });
        }

        await transaction.commit();
        if (!newproduct) {
            response.setError(Errors.ProductSave);
            return response;
        }
    }
    response.setSuccess(Success.SaveProduct);
    return response;
};

export const getPriceListProductsRepository = async (search: PriceListProductsSearchDTO): Promise<PriceListProductsVM> => {
    const response = new PriceListProductsVM();
    const offset = (search.Pagination.Page - 1) * search.Pagination.Limit;

    const productsDB = await Product.findAll({
        where: { IsActive: true, ...(search.ProductName && { Name: { [Op.like]: `%${search.ProductName}%` } }), ...(search.CategoryId && { CategoryId: search.CategoryId }) },
        attributes: ["Id", "Name", "Price", "Discount", "PromotionalPrice"],
        offset,
        limit: search.Pagination.Limit
    });

    if (productsDB.length > 0) {
        response.Items = productsDB.map(mapPriceListProductsDBToVM);
        response.TotalItems = await Product.count({ where: { IsActive: true, ...(search.ProductName && { Name: { [Op.like]: `%${search.ProductName}%` } }), ...(search.CategoryId && { CategoryId: search.CategoryId }) } });
    } else {
        response.setWarning(Errors.ProductListNotFound);
    }
    return response;
};

export const updatePriceProductRepository = async (toUpdate: UpdatePriceProductDTO): Promise<ResponseMessages> => {
    const response = new ResponseMessages();
    const [affectedRows] = await Product.update(
        {
            Price: toUpdate.Price,
            Discount: toUpdate.Discount,
            PromotionalPrice: toUpdate.PromotionalPrice,
            IsPromotional: toUpdate.Discount > 0
        },
        { where: { Id: toUpdate.ProductId } }
    );

    if (affectedRows > 0) {
        response.setSuccess(Success.UpdateProduct);
    } else {
        response.setError(Errors.ProductSave);
    }
    return response;
};

export const updateAllProductsPricetRepository = async (toUpdate: UpdateAllPriceProductDTO): Promise<ResponseMessages> => {
    const response = new ResponseMessages();
    const updateFields: any = {};

    if (toUpdate.ActionType === ActionTypePriceListEnum.ChangePrice) {
        updateFields.Price = Sequelize.literal(`Price * (1 + ${toUpdate.Percentage} / 100)`);
        updateFields.Discount = Sequelize.literal(`Discount`);
        updateFields.PromotionalPrice = Sequelize.literal(`Price - (Price * (Discount / 100))`);
    }

    if (toUpdate.ActionType === ActionTypePriceListEnum.ChangeDiscount) {
        updateFields.Discount = toUpdate.Discount || 0;
        updateFields.PromotionalPrice = Sequelize.literal(`Price - (Price * (${toUpdate.Discount} / 100))`);
        updateFields.IsPromotional = toUpdate.Discount && toUpdate.Discount > 0;
    }


    try {
        await Product.update(updateFields, {
            where: {
                IsActive: true,
                ...(toUpdate.CategoryId && { CategoryId: toUpdate.CategoryId }) // Condición opcional para CategoryId
            }
        });

        if (toUpdate.CategoryId) response.setSuccess(Success.UpdateAllCategoryProduct);
        else response.setSuccess(Success.UpdateAllProduct);
    } catch (error) {
        response.setError(Errors.UpdateProducts);
    }

    return response;
};
