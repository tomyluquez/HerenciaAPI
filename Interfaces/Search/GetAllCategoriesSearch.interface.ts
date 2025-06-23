import { IPagination } from "../Pagination.interface";

export interface GetAllCategoriesSearchDTO {
    Name: string;
    IsActive?: boolean;
    Pagination: IPagination;
}