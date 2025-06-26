import Cart from "./Models/Cart.Model";
import CartItems from "./Models/CartItems.model";
import Category from "./Models/Category.model";
import DiscountCoupon from "./Models/DiscountCoupon.model";
import Order from "./Models/Order.model";
import OrderItems from "./Models/OrderItem.model";
import OrderStatus from "./Models/OrderStatus.model";
import PaymentMethod from "./Models/PaymentMethod.model";
import Product from "./Models/Product.model";
import ProductImages from "./Models/ProductImages.model";
import Promotion from "./Models/Promotion.model";
import RelatedProduct from "./Models/RelatedProducts.Model";
import Shipping from "./Models/Shipping.model";
import ShippingMethod from "./Models/ShippingMethod.model";
import Size from "./Models/Size.model";
import User from "./Models/User.model";
import Variant from "./Models/Variant.model";

// Asociación de uno a muchos
Product.belongsTo(Category, {
    foreignKey: "CategoryId",
    as: "Category"
});

RelatedProduct.belongsTo(Product, {
    foreignKey: "RelatedProductId",
    as: "Related"
});

ProductImages.belongsTo(Product, {
    foreignKey: "ProductId",
    as: "Product"
});

Cart.belongsTo(User, {
    foreignKey: "UserId",
    as: "User"
});

CartItems.belongsTo(Cart, {
    foreignKey: "CartId",
    as: "Cart"
});

CartItems.belongsTo(Variant, {
    foreignKey: "VariantId",
    as: "Variant"
});

Order.belongsTo(User, {
    foreignKey: "UserId",
    as: "User"
});
Order.belongsTo(Promotion, {
    foreignKey: "PromotionId",
    as: "Promotion"
});
Order.belongsTo(PaymentMethod, {
    foreignKey: "PaymentMethodId",
    as: "PaymentMethod"
});
Order.belongsTo(ShippingMethod, {
    foreignKey: "ShippingMethodId",
    as: "ShippingMethod"
});
Order.belongsTo(OrderStatus, {
    foreignKey: "OrderStatusId",
    as: "OrderStatus"
});
Order.belongsTo(DiscountCoupon, {
    foreignKey: "DiscountCouponId",
    as: "DiscountCoupon"
});

Variant.belongsTo(Product, { foreignKey: "ProductId", as: "Product" });

Variant.belongsTo(Size, { foreignKey: "SizeId", as: "Size" });

OrderItems.belongsTo(Order, {
    foreignKey: "OrderId",
    as: "Order"
});
OrderItems.belongsTo(Variant, {
    foreignKey: "VariantId",
    as: "Variant"
});

Shipping.belongsTo(Order, {
    foreignKey: "OrderId",
    as: "Order"
});

// Asociación de muchos a uno
Category.hasMany(Product, {
    foreignKey: "CategoryId",
    as: "Products"
});
Product.hasMany(RelatedProduct, {
    foreignKey: "ProductId",
    as: "RelatedProducts"
});
User.hasMany(Cart);
Cart.hasMany(CartItems);
Variant.hasMany(CartItems, {
    foreignKey: "VariantId",
    as: "CartItems"
});
Product.hasMany(Variant, {
    foreignKey: "ProductId",
    as: "Variants"
});
Product.hasMany(ProductImages, {
    foreignKey: "ProductId",
    as: "Images"
});
Size.hasMany(Variant);
User.hasMany(Order, {
    foreignKey: "UserId",
    as: "Orders"
});
Promotion.hasMany(Order);
PaymentMethod.hasMany(Order);
ShippingMethod.hasMany(Order);
OrderStatus.hasMany(Order);
Order.hasMany(OrderItems, {
    foreignKey: "OrderId",
    as: "OrderItems"
});
Variant.hasMany(OrderItems);
Order.hasOne(Shipping);
DiscountCoupon.hasMany(Order, {
    foreignKey: "DiscountCouponId",
    as: "Orders"
});
