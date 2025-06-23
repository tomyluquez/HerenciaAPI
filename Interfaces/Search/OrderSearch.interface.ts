import { IPagination } from "../Pagination.interface";

export interface OrderSearchDTO {
    customerName?: string;
    orderNumber?: number;
    orderStatus?: number;
    Pagination: IPagination;
    StartDate: Date | null;
    EndDate: Date | null
}
