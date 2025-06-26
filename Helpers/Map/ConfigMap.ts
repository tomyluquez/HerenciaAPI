import { SearchCouponList } from "../../Interfaces/DiscountCoupon.interface";
import { SearchConfigDTO } from "../../Interfaces/Search/SearchConfig.interface";
import { mapPaginationQueryToDTO } from "./PaginationMap";

export const mapQueryConfigSearchToDTO = (query: any): SearchConfigDTO => {
    return {
        Pagination: mapPaginationQueryToDTO(query),
    };
};

export const mapQueryCouponSearchToDTO = (query: any, isActive: boolean | undefined): SearchCouponList => {
    return {
        Pagination: mapPaginationQueryToDTO(query),
        Status: isActive,
        Name: query.name
    };
};