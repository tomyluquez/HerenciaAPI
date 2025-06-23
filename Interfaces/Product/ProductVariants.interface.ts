import Product from "../../Database/Models/Product.model";

export interface IProductVariants {
    Id?: number;
    Stock: number;
    Name: string;
    SizeId?: number;
    Product?: Product;
    ProductId: number;
    ProductName?: string;
}
