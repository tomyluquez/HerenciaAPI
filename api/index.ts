import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { syncDatabase } from "../Database/sync";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
    res.send('API funcionando correctamente');
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`),
        syncDatabase();
});
