
export interface IOrderVM {
    Id: number,
    OrderNumber: number;
    DateCreated: Date;
    CustomerName: string;
    OrderStatusId: number;
    CustomerEmail?: string
}
