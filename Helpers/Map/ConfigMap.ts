import { SearchConfigDTO } from "../../Interfaces/Search/SearchConfig.interface";
import { mapPaginationQueryToDTO } from "./PaginationMap";

export const mapQueryConfigSearchToDTO = (query: any): SearchConfigDTO => {
    return {
        Pagination: mapPaginationQueryToDTO(query),
    };
};