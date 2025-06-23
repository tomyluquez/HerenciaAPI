import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { syncDatabase } from "./Database/sync";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
    try {
        res.send('API funcionando correctamente');
    } catch (error) {
        console.error("Error DB:", error);
        res.status(500).send("Error al conectar a la base de datos");
    }
});

syncDatabase();

export default app;
