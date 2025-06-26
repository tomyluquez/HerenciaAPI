import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import 'mysql2';
import { syncDatabase } from "./Database/sync";
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
const PORT = process.env.SERVER_PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/products", RouterProducts);
app.use("/api/v1/categories", RouterCategories);
app.use("/api/v1/variants", RouterVariants);
app.use("/api/v1/cart", RouterCart);
app.use("/api/v1/checkout", RouterCheckout);
app.use("/api/v1/config", RouterConfig);
app.use("/api/v1/orders", RouterOrders);
app.use("/api/v1/sizes", RouterSizes);
app.use("/api/v1/users", RouterUser);

app.use("/", (req, res) => {
    res.status(404).send("La ruta no fue encontrada")
});

app.listen(PORT, async () => {
    try {
        await syncDatabase();
        console.log("index actual");
    } catch (error) {
        console.error("Error al sincronizar la base de datos:", error);
        process.exit(1); // Opcional: salir con código de error
    }
});


export default app;
