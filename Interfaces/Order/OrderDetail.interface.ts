import { OrderItem } from "./OrderItem.interface";

export interface IOrderDetailVM {
    Id: number;
    OrderNumber: number;
    Total: number;
    Subtotal: number;
    DiscountCouponTotal: number;
    DiscountCoupon?: string,
    DiscountPaymentTotal: number;
    DateCreated: Date;
    OrderStatus: string;
    OrderStatusId: number;
    PaymentMethod?: string;
    ShippingMethod?: string;
    CustomerName: string;
    CustomerEmail: string;
    CustomerPhone?: number;
    Details?: OrderItem[];
}   