import { IPagination } from "./Pagination.interface";

export interface IDiscountCoupon {
    Id: number;
    Name: string;
    Discount: number;
    DateCreated: string;
    IsActive: boolean;
}

export interface SearchCouponList {
    Pagination: IPagination;
    Status: boolean | undefined;
    Name: string
}