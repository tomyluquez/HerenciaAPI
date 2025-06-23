import "dotenv/config";
import sequelize from "./connection";


export async function syncDatabase() {
    try {
        // Verifica la conexión
        await sequelize.authenticate();
        console.log("Conexión establecida correctamente.");

        // await sequelize.sync({ force: false });

        // console.log(`Tablas sincronizadas correctamente.`);
    } catch (error) {
        console.error("Error sincronizando las tablas:", error);
    }
}

// Ejecuta la sincronización
syncDatabase();
