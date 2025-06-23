import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../../Database/Models/User.model";

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1]; // Obtener el token del encabezado

    if (!token || token === "null") {
        console.log("no hay token");
        return res.status(401).json({ message: "Por favor, inicia sesión" });
    }

    try {
        const secretKey = process.env.SECRET_KEY!;
        const decoded = jwt.verify(token, secretKey);
        req.app.locals = decoded as User; // Guardar la información del usuario en el request

        next();
    } catch (error) {
        return res.status(401).json({ message: "Por favor, inicia sesión" });
    }
};

export const authorizeRole = (roles: number[]) => (req: Request, res: Response, next: NextFunction) => {
    const userRole = Number(req.app.locals.role)
    if (!roles.includes(userRole)) {
        return res.status(403).json({ message: "No tienes permiso para acceder a esta ruta" });
    }
    next();
};
