import { IPagination } from "../Pagination.interface";

export interface SizeListSearchDTO {
    Name: string;
    IsActive?: boolean | undefined;
    Pagination: IPagination;
}
