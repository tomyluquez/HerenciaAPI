import Product from "../../Database/Models/Product.model";
import RelatedProduct from "../../Database/Models/RelatedProducts.Model";
import Variant from "../../Database/Models/Variant.model";
import { PaginationEnum } from "../../Enums/PaginationEnum";
import { IPriceListProducts } from "../../Interfaces/Product/PriceListProduct.interface";
import { IProduct } from "../../Interfaces/Product/product";
import { IProductVM } from "../../Interfaces/Product/Product.interface";
import { IProductDB } from "../../Interfaces/Product/ProductDB.interface";
import { IProductPagedListVM } from "../../Interfaces/Product/ProductPagdList.interface";
import { IPromotionalProduct } from "../../Interfaces/Product/PromotionalProducts.interface";
import { UpdateAllPriceProductDTO, UpdatePriceProductDTO } from "../../Interfaces/Product/UpdatePriceProduct.interface";
import { GetAllProductsSearchDTO } from "../../Interfaces/Search/GelAllProductSearch.interface";
import { PriceListProductsSearchDTO } from "../../Interfaces/Search/PriceListProductSearch.interface";
import { ProductPagedListSearchDTO } from "../../Interfaces/Search/ProductPagedListSearch.interface";
import { mapPaginationQueryToDTO } from "./PaginationMap";

export const mapProductDBToVM = (productDB: Product): IProductVM => {
    const product = {
        Id: productDB.Id!,
        Name: productDB.Name,
        Price: productDB.Price,
        Description: productDB.Description,
        Variants: productDB.Variants!.map((variant) => {
            return {
                Stock: variant.Stock,
                Name: variant.Size!.Name,
                SizeId: variant.Size!.Id,
                Id: variant.Id,
                ProductId: variant.ProductId
            };
        }),
        Images: productDB.Images?.map((image) => image.Url) || [],
        CategoryName: productDB.Category?.Name || "Sin categoria",
        CategoryId: productDB.CategoryId,
        Discount: productDB.Discount,
        Cost: productDB.Cost,
        IsActive: productDB.IsActive,
        IsPromotional: productDB.IsPromotional,
        PromotionalPrice: productDB.PromotionalPrice,
        Rentability: productDB.Rentability,
        RelatedProductIds: productDB.RelatedProducts!.map((rp) => rp.RelatedProductId),
        RelatedProducts: productDB.RelatedProducts!.map((rp) => {
            return {
                Name: rp.Related?.Name,
                Id: rp.Related?.Id,
                Image: rp.Related?.Images && rp.Related?.Images.length > 0 ? rp.Related?.Images[0].Url : ""
            };
        })
    };
    return product;
};

export const mapPromotionalDBToVM = (productDB: Product): IPromotionalProduct => {
    const product = {
        Id: productDB.Id!,
        Name: productDB.Name,
        Price: productDB.Price,
        Image: productDB.Images && productDB.Images.length > 0 ? productDB.Images[0].Url : "",
        CategoryName: productDB.Category?.Name || "Sin categoria"
    };
    return product;
};

export const mapProductDBToProductPagedListVM = (productDB: Product): IProductPagedListVM => {
    const product = {
        Id: productDB.Id!,
        Name: productDB.Name,
        CategoryName: productDB.Category?.Name || "Sin categoria",
        Price: productDB.Price,
        Image: productDB.Images && productDB.Images.length > 0 ? productDB.Images[0].Url : "",
        HasStock: productDB.Variants!.some((v) => v.Stock > 0),
        IsActive: productDB.IsActive,
        PromotionalPrice: productDB.PromotionalPrice,
        Rentability: productDB.Rentability,
        Cost: productDB.Cost
    };
    return product;
};

export const mapProductDBToProductVM = (productDB: Product): IProduct => {
    const product = {
        Id: productDB.Id!,
        Name: productDB.Name,
        CategoryName: productDB.Category?.Name || "Sin categoria",
        Price: productDB.Price,
        Image: productDB.Images && productDB.Images.length > 0 ? productDB.Images[0].Url : "",
        PromotionalPrice: productDB.PromotionalPrice,
    };
    return product;
};

export const MapBodyToProductDB = (body: any): IProductVM => {
    const product = {
        Id: body.Id ? body.Id : null,
        Name: body.Name,
        Price: body.Price,
        Description: body.Description,
        Variants: body.Variants!.map((variant: Variant) => {
            return {
                Stock: variant.Stock,
                Name: variant.Size!.Name
            };
        }),
        Images: body.Images || [],
        CategoryName: null,
        CategoryId: body.CategoryId,
        Discount: body.Discount,
        Cost: body.Cost,
        IsActive: body.IsActive || true,
        IsPromotional: body.IsPromotional || false,
        PromotionalPrice: body.PromotionalPrice,
        Rentability: body.Rentability
    };
    return product;
};

// ver como se guardan los productos con FK
export const MapProductVMToProductDB = (productVM: IProductVM): IProductDB => {
    const productDB: IProductDB = {
        Id: productVM.Id || 0,
        Name: productVM.Name,
        Price: productVM.Price,
        PromotionalPrice: productVM.PromotionalPrice,
        Cost: productVM.Cost || 0,
        Discount: productVM.Discount || 0,
        Description: productVM.Description || "",
        IsActive: productVM.IsActive,
        IsPromotional: productVM.IsPromotional || false,
        CategoryId: productVM.CategoryId,
        Variants: productVM.Variants || [],
        Rentability: productVM.Rentability
    };

    return productDB;
};

export const mapPriceListProductsDBToVM = (productDB: Product): IPriceListProducts => {
    return {
        Id: productDB.Id,
        ProductName: productDB.Name,
        Price: productDB.Price,
        Discount: productDB.Discount,
        PromotionalPrice: productDB.PromotionalPrice
    };
};

export const mapGetAllProductsQueryToDTO = (name: string, IsActive: boolean | undefined, categories: string[], page: string, limit: string): GetAllProductsSearchDTO => {
    return {
        Name: name as string,
        Categories: categories,
        IsActive,
        Pagination: {
            Page: page ? Number(page) : 1,
            Limit: limit ? Number(limit) : 10000
        }
    };
};

export const mapProductPagedListQueryToDTO = (query: any, categories: string[], sizes: string[], status: boolean | undefined): ProductPagedListSearchDTO => {
    return {
        Name: query.name as string,
        Categories: categories,
        Sizes: sizes.map((s) => Number(s)),
        Order: query.order as string,
        Pagination: {
            Page: query.page ? Number(query.page) : PaginationEnum.Page,
            Limit: query.limit ? Number(query.limit) : PaginationEnum.Limit
        },
        Status: status
    };
};

export const mapPriceListProductsSearchQueryToDTO = (query: any): PriceListProductsSearchDTO => {
    return {
        Pagination: mapPaginationQueryToDTO(query),
        ProductName: query.productName as string,
        CategoryId: Number(query.category) || 0
    };
};

export const mapUpdatePriceProductBodyToDTO = (query: any): UpdatePriceProductDTO => {
    return {
        ProductId: Number(query.productId),
        Price: Number(query.price),
        Discount: Number(query.discount),
        PromotionalPrice: Number(query.promotionalPrice)
    };
};

export const mapUpdateAllPriceProductBodyToDTO = (query: any): UpdateAllPriceProductDTO => {
    return {
        ActionType: Number(query.actionType),
        Percentage: Number(query.percentage) || 0,
        Discount: Number(query.discount) || 0,
        CategoryId: Number(query.categoryId) || 0
    };
};
