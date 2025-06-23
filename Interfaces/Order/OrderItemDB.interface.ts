export interface OrderItemDB {
    Id: number;
    OrderId: number;
    UnitPrice: number;
    TotalPrice: number;
    Quantity: number;
    VariantId: number;
    DateCreated: Date;
    DateUpdated: Date;
}
