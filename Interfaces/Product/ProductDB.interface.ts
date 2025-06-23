import { IProductVariants } from "./ProductVariants.interface";

export interface IProductDB {
    Id?: number;
    Name: string;
    Price: number;
    PromotionalPrice: number;
    Rentability: number;
    Cost: number;
    Discount: number;
    Description?: string;
    IsActive?: boolean;
    IsPromotional?: boolean;
    CategoryId: number;
    DateUpdated?: Date;
    DateCreated?: Date;
    Variants: IProductVariants[];
}
