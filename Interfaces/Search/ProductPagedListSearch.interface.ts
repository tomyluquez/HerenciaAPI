import { IPagination } from "../Pagination.interface";

export interface ProductPagedListSearchDTO {
    Name: string;
    Categories: string[];
    Sizes: number[];
    Pagination: IPagination;
    Order: string;
    Status: boolean | undefined;
}
