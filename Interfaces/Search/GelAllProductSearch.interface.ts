import { IPagination } from "../Pagination.interface";

export interface GetAllProductsSearchDTO {
    Name: string;
    Categories: string[];
    IsActive?: boolean | undefined;
    Pagination: IPagination;
}
