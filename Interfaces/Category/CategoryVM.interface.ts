import Product from "../../Database/Models/Product.model";

export interface ICategoryVM {
    Id: number;
    Name: string;
    Image: string;
    IsActive?: boolean;
    Products?: Product[];
}
