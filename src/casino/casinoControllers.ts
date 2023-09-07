import { Request, Response } from "express";
import { prisma } from "../config/prismaClient";

export const getBalanceController = async (req: Request, res: Response) => {
  // El middleware de autenticación ya ha verificado el token y adjuntado los datos del usuario en res.locals
  // Puedes acceder a estos datos para obtener el saldo del usuario autenticado
  const userId = res.locals.userId;

  try {
    // Consulta la base de datos para obtener el saldo del usuario
    const user = await prisma().usuario.findUnique({
      where: { id: userId },
      select: { balance: true }, // Selecciona solo el campo de saldo
    });

    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    // Devuelve el saldo del usuario en formato JSON
    res.json({ saldo: user.balance });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener el saldo" });
  }
};
