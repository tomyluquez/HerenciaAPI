export enum Errors {
    Categories = "Error al cargar las categorias, por favor intente nuevamente.",
    Category = "Error al cargar la categoria, por favor intente nuevamente.",
    CategoryChangeState = "Error al cambiar de estado la categoria, por favor intente nuevamente.",
    CategorySave = "Error al guardar la categoria, por favor intente nuevamente.",
    CategoryNotFound = "La categoria no existe.",
    CategoryWhitProducts = "La categoria no puede ser desactivada porque tiene productos asociados.",

    ExistingName = "El nombre debe ser único, este nombre ya esta en uso.",
    ExistingEMail = "El email debe ser único, este email ya esta en uso.",

    Products = "Error al cargar los prodcutos, por favor intente nuevamente.",
    Product = "Error al cargar el producto , por favor intente nuevamente.",
    ProductChangeState = "Error al cambiar de estado el producto, por favor intente nuevamente.",
    ProductSave = "Error al guardar el producto, por favor intente nuevamente.",
    ProductNotFound = "El producto no existe.",
    ProductsNotFound = "No se encontraron productos.",
    ProductVariants = "Error al cargar el stock, por favor intente nuevamente.",
    PriceListProducts = "Error al carga la lista de precios, por favor intente nuevamente.",
    ProductListNotFound = "La lista de precios no existe.",
    UpdateProducts = "Error al actualizar los productos, por favor intente nuevamente.",

    IdRequired = "El id es requerido.",
    StatusRequired = "El status es requerido.",
    QuantityRequired = "La cantidad es requerida.",
    ActionRequired = "La accion es requerida.",
    NameRequired = "El nombre es requerido.",

    UpdateStock = "Error al actualizar el stock, por favor intente nuevamente",

    Cart = "Error al cargar el carrito, por favor intente nuevamente.",
    CartUserNotFound = "El usuario no tiene carritos activos",
    CartEmpty = "El carrito esta vacio",
    CartItems = "Error al obtener los productos del carrito, por favor intente nuevamente.",
    CartItem = "Error al guardar el producto, por favor intente nuevamente.",
    CartItemNotFound = "El producto no existe.",

    HasNotStock = "No hay stock suficiente",
    NotSubstract = "No se puede restar menos de 0",

    Variant = "Error al cargar el stock",

    CheckoutInfo = "Error al cargar la informacion de la compra, por favor intente nuevamente.",
    DiscountCouponNotFound = "El cupon de descuento no existe o esta caducado.",

    CompanyInfo = "Error al cargar la informacion de la empresa, por favor intente nuevamente.",
    CompanyInfoNotFound = "La informacion de la empresa no existe.",
    CompanySave = "Error al guardar la informacion de la empresa, por favor intente nuevamente.",

    Menu = "Error al cargar el menu, por favor intente nuevamente.",
    MenuNotFound = "El menu no existe.",

    Config = "Error al cargar la configuracion, por favor intente nuevamente.",
    ConfigNotFound = "La configuracion no existe.",
    ConfigSave = "Error al guardar la configuracion, por favor intente nuevamente.",
    ConfigDuplicatedName = "Tienes una configuracion con el mismo nombre.",

    Orders = "Error al cargar las ordenes, por favor intente nuevamente.",
    OrdersNotFound = "No se encontraron ordenes.",
    OrderChangeStatus = "Error al cambiar el estado de la orden, por favor intente nuevamente.",
    OrderStatus = "Error al obtener los estados de las ordenes",
    OrderStatusNotFound = "No se encontraron estados de ordenes.",
    SaveOrder = "Error al guardar la orden, por favor intentte nuevamente.",

    StatusNotFound = "El estado no existe.",
    StatusCahnge = "Error al cambiar el estado, por favor intente nuevamente.",

    Sizes = "Error al cargar los talles, por favor intente nuevamente.",
    Size = "Error al cargar el talle, por favor intente nuevamente.",
    SizeChangeStatus = "Error al cambiar el estado del talle, por favor intente nuevamente.",
    SizeSave = "Error al guardar el talle, por favor intente nuevamente.",
    SizeNotFound = "Error al cargar el talle, por favor intente nuevamente.",
    SizeWhitProducts = "El talle no puede ser desactivado porque tiene productos asociados.",


    UserProfile = "Error al cargar el perfil del usuario, por favor intente nuevamente.",
    UserRegister = "Error al registrar el usuario, por favor intente nuevamente.",
    UserLogin = "Error al iniciar sesion, por favor intente nuevamente.",
    UserEmailAndPassLogin = "El email o la contrasena son incorrectos.",
    UserNameRequired = "El nombre es requerido.",
    UserEmailRequired = "El email es requerido.",
    UserPassRequired = "La contrasena es requerida."
}
