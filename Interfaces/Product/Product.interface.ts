import { IProductVariants } from "./ProductVariants.interface";
import { IRelatedProduct } from "./RelatedProduct.interface";

export interface IProductVM {
    Id: number;
    Name: string;
    Price: number;
    PromotionalPrice: number;
    Rentability: number;
    Description: string;
    Variants?: IProductVariants[];
    Images: string[];
    CategoryName: string | null;
    CategoryId: number;
    Discount: number;
    Cost: number;
    IsActive: boolean;
    IsPromotional: boolean;
    RelatedProductIds?: number[];
    RelatedProduct?: IRelatedProduct[];
}
