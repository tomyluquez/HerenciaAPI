export interface UpdatePriceProductDTO {
    ProductId: number;
    Price: number;
    Discount: number;
    PromotionalPrice: number;
}

export interface UpdateAllPriceProductDTO {
    ActionType: number;
    Percentage?: number;
    Discount?: number;
    CategoryId?: number;
}
