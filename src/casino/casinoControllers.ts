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

// Controlador para comprar un cupón
export const buyCouponController = async (req: Request, res: Response) => {
  try {
    const { couponValue } = req.body; // Valor del cupón seleccionado desde el frontend

    // Obtén el ID del usuario autenticado desde el middleware de autenticación
    const userId = res.locals.userId;

    // Consulta la base de datos para obtener el saldo actual del usuario
    const user = await prisma().usuario.findUnique({
      where: { id: userId },
      select: { balance: true },
    });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Calcula el nuevo saldo del usuario sumando el valor del cupón al saldo actual
    const newBalance = user.balance + couponValue;

    // Inicia una transacción de base de datos para registrar la compra de cupón
    const createdTransaction = await prisma().transaction.create({
      data: {
        amount: couponValue,
        type: "compra de cupón",
        userId: userId,
        // date y userts se llenarán automáticamente por Prisma
      },
    });
    // Actualiza el saldo del usuario en la base de datos
    const updatedUser = await prisma().usuario.update({
      where: { id: userId },
      data: { balance: newBalance },
    });

    // Devuelve la respuesta al frontend, incluyendo el nuevo saldo del usuario
    res.status(200).json({
      message: "Compra de cupón exitosa",
      newBalance: updatedUser.balance,
    });
  } catch (error) {
    console.error("Error en la compra de cupón:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};
