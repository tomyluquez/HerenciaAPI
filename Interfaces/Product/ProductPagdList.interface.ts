export interface IProductPagedListVM {
    Id: number;
    Name: string;
    CategoryName: string;
    Price: number;
    Cost: number;
    PromotionalPrice: number;
    Rentability: number;
    Image?: string;
    HasStock: boolean;
    IsActive: boolean;
}
