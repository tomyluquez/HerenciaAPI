import { IPagination } from "../../Interfaces/Pagination.interface";

export const mapPaginationQueryToDTO = (query: any): IPagination => {
    return {
        Page: Number(query.page) || 1,
        Limit: Number(query.limit) || 10000
    };
};
