import sequelize from "./connection";
import "./associations";


export async function syncDatabase() {
    try {
        await sequelize.authenticate();
        console.log("Conexión establecida correctamente.");

        await sequelize.sync({ force: false });
        console.log(`Tablas sincronizadas correctamente.`);
    } catch (error) {
        console.error("Error sincronizando las tablas:", error);
        throw error; // <== Agregá esto
    }
}

// Ejecuta la sincronización
// syncDatabase();
