import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../../Database/Models/User.model";

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token || token === "null") {
        console.log("no hay token");
        res.status(401).json({ message: "Por favor, inicia sesión" });
        return;
    }

    try {
        const secretKey = process.env.SECRET_KEY!;
        const decoded = jwt.verify(token, secretKey);
        req.app.locals = decoded as User;
        next();
    } catch (error) {
        res.status(401).json({ message: "Por favor, inicia sesión" });
    }
};


export const authorizeRole = (roles: number[]) =>
    (req: Request, res: Response, next: NextFunction): void => {
        const userRole = Number(req.app.locals.role);
        if (!roles.includes(userRole)) {
            res.status(403).json({ message: "No tienes permiso para acceder a esta ruta" });
            return;
        }
        next();
    };

