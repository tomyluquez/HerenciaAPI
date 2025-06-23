import { OrderItem } from "./OrderItem.interface";

export interface OrderDTO {
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
    OrderStatusId: number;
    PaymentMethodId: number;
    PromotionId: number;
    ShippingMethodId: number;
    CustomerName: string;
    ShippingCost: number;
    UserId: number;
    Details?: OrderItem[];
    CartId: number;
}