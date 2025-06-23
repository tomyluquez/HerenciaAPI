import { IPagination } from "../Pagination.interface";

export interface PriceListProductsSearchDTO {
    ProductName: string;
    CategoryId: number;
    Pagination: IPagination;
}
