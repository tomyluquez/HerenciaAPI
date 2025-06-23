import { IPagination } from "../Pagination.interface";

export interface SearchProductsStockPagedListDTO {
    ProductName: string;
    Pagination: IPagination;
    Status: boolean | undefined;
    SizeId: number
    CategoryId: number
}