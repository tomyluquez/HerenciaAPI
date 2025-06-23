import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { syncDatabase } from "./Database/sync";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
    res.send('API funcionando correctamente');
});

syncDatabase();

export default app;
