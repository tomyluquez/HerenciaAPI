import Variant from "../../Database/Models/Variant.model";
import { NameAndId } from "../../Interfaces/NameAndId.interface";
import { IProductsStock } from "../../Interfaces/Product/ProductStock.interface";
import { IProductVariants } from "../../Interfaces/Product/ProductVariants.interface";
import { SearchProductsStockPagedListDTO } from "../../Interfaces/Search/ProductStockPagedListSearch.interface";
import { IProductVariantsSearchDTO } from "../../Interfaces/Search/ProductVariantSearch.interface";
import { ISizeListVM } from "../../Interfaces/Size/SizeList.interface";
import { convertedStatusNumberFilter } from "../ConvertedFilters";
import { mapPaginationQueryToDTO } from "./PaginationMap";

export const mapVariantsProductDBToVM = (VariantDB: Variant): IProductVariants => {
    return {
        Id: VariantDB.Id,
        Stock: VariantDB.Stock,
        Name: VariantDB.Size?.Name!,
        SizeId: VariantDB.SizeId,
        Product: VariantDB.Product,
        ProductId: VariantDB.ProductId
    };
};

export const mapProductsStockDBToVM = (VariantDB: Variant): IProductsStock => {
    return {
        Id: VariantDB.Id,
        Stock: VariantDB.Stock,
        Name: VariantDB.Size?.Name!,
        SizeId: VariantDB.SizeId,
        ProductId: VariantDB.ProductId,
        ProductName: VariantDB.Product.Name,
        ValuedStock: VariantDB.Product.Cost * VariantDB.Stock || 0
    };
};

export const mapQueryProductVariantsSearchToDTO = (query: any): IProductVariantsSearchDTO => {
    return {
        ProductId: +query.productId,
        Pagination: mapPaginationQueryToDTO(query)
    };
};

export const mapQueryProductsStockSearchToDTO = (query: any): SearchProductsStockPagedListDTO => {
    return {
        ProductName: query.productName as string,
        Pagination: mapPaginationQueryToDTO(query),
        Status: convertedStatusNumberFilter(Number(query.status)),
        SizeId: Number(query.sizeId),
        CategoryId: Number(query.categoryId)
    };
};

export const mapDataToNameAndId = (categories: any): NameAndId[] => {
    return categories.map((item: any) => ({ Name: item.Name, Id: item.Id }));
}

export const mapVariantDBToSize = (variant: Variant): ISizeListVM => {
    return {
        Id: variant.SizeId,
        Name: variant.Size?.Name || "",
        IsActive: variant.Size?.IsActive || false
    }
}

