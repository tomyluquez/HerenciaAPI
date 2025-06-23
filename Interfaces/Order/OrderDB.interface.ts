import { OrderItemDB } from "./OrderItemDB.interface";

export interface OrderDB {
    Id: number;
    OrderNumber: number;
    Total: number;
    Subtotal: number;
    DiscountCouponTotal: number;
    DiscountCouponPercentage: number,
    DiscountCouponId: number,
    DiscountPaymentTotal: number;
    DiscountPaymentPercentage: number,
    DateCreated: Date;
    DateUpdated: Date;
    OrderStatusId: number;
    PaymentMethodId: number;
    ShippingMethodId: number;
    CustomerName: string;
    ShippingCost: number;
    UserId: number;
    Details?: OrderItemDB[];
    IsActive: boolean,
    PromotionId: number;
}