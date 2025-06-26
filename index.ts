import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { syncDatabase } from "./Database/sync";
import 'mysql2';
import { RouterProducts } from './api/Routes/Product.Routes';
import { RouterCategories } from './api/Routes/Category.routes';
import { RouterVariants } from './api/Routes/Variant.Routes';
import { RouterCart } from './api/Routes/Cart.Routes';
import { RouterCheckout } from './api/Routes/Checkout.Routes';
import { RouterConfig } from './api/Routes/Config.Routes';
import { RouterOrders } from './api/Routes/Order.routes';
import { RouterSizes } from './api/Routes/Size.Routes';
import { RouterUser } from './api/Routes/User.Routes';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
    try {
        res.send('La ruta no fue encontrada, para utilizar la api debe ingresar /api/v1/');
    } catch (error) {
        console.error("Error DB:", error);
        res.status(500).send("Error al conectar a la base de datos");
    }
});
app.use("/api/v1/products", RouterProducts);
app.use("/api/v1/categories", RouterCategories);
app.use("/api/v1/variants", RouterVariants);
app.use("/api/v1/cart", RouterCart);
app.use("/api/v1/checkout", RouterCheckout);
app.use("/api/v1/config", RouterConfig);
app.use("/api/v1/orders", RouterOrders);
app.use("/api/v1/sizes", RouterSizes);
app.use("/api/v1/users", RouterUser);


syncDatabase();

export default app;
