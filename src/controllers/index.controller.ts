import type { Request, Response } from "express";
import { conexion } from "../config/database.js";

export const ping = async (req: Request, res: Response) => {
    const [result] = await conexion.query("SELECT 'Pong' AS result");
    res.json(result);
};
