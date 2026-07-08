import type { Request, Response } from "express";
import { conexion } from "../config/database.js";
import type { ResultSetHeader, RowDataPacket } from "mysql2";

export const getEmpleados = async (req: Request, res: Response) => {
    try {
        const [result] = await conexion.query("SELECT * FROM empleado");
        res.json(result);
    } catch (error) {
        return res.status(500).json({ mensaje: "Error en el servidor" });
    }
};

export const getEmpleado = async (req: Request, res: Response) => {
    try {
        const [result] = await conexion.query<RowDataPacket[]>("SELECT * FROM empleado WHERE id = ?", [req.params.id]);

        if (result.length <= 0) return res.status(404).json({ mensaje: "Empleado no encontrado" });

        res.json(result[0]);
    } catch (error) {
        return res.status(500).json({ mensaje: "Error en el servidor" });
    }
};

export const postEmpleados = async (req: Request, res: Response) => {
    const { nombre, salario } = req.body;

    try {
        const [result] = await conexion.query<ResultSetHeader>("INSERT INTO empleado (nombre, salario) VALUES (?, ?)", [nombre, salario]);
        res.send({
            id: result.insertId,
            nombre,
            salario,
        });
    } catch (error) {
        return res.status(500).json({ mensaje: "Error en el servidor" });
    }
};

export const putEmpleados = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { nombre, salario } = req.body;

    try {
        const [result] = await conexion.query<ResultSetHeader>(
            "UPDATE empleado SET nombre = IFNULL(?, nombre), salario = IFNULL(?, salario) WHERE id = ?",
            [nombre, salario, id],
        );

        if (result.affectedRows === 0) return res.status(404).json({ mensaje: "Empleado no encontrado" });

        const [rows] = await conexion.query<RowDataPacket[]>("SELECT * FROM empleado WHERE id = ?", [id]);

        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ mensaje: "Error en el servidor" });
    }
};

export const deleteEmpleados = async (req: Request, res: Response) => {
    try {
        const [result] = await conexion.query<ResultSetHeader>("DELETE FROM empleado WHERE id = ?", [req.params.id]);

        if (result.affectedRows <= 0) return res.status(404).json({ mensaje: "Empleado no encontrado" });

        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ mensaje: "Error en el servidor" });
    }
};
