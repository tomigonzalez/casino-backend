"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserController = exports.buyCouponController = exports.getBalanceController = void 0;
const prismaClient_1 = require("../config/prismaClient");
const getBalanceController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // El middleware de autenticación ya ha verificado el token y adjuntado los datos del usuario en res.locals
    // Puedes acceder a estos datos para obtener el saldo del usuario autenticado
    const userId = res.locals.userId;
    try {
        // Consulta la base de datos para obtener el saldo del usuario
        const user = yield (0, prismaClient_1.prisma)().usuario.findUnique({
            where: { id: userId },
            select: { balance: true }, // Selecciona solo el campo de saldo
        });
        if (!user) {
            throw new Error("Usuario no encontrado");
        }
        // Devuelve el saldo del usuario en formato JSON
        res.json({ saldo: user.balance });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener el saldo" });
    }
});
exports.getBalanceController = getBalanceController;
// Controlador para comprar un cupón
const buyCouponController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { couponValue } = req.body; // Valor del cupón seleccionado desde el frontend
        // Obtén el ID del usuario autenticado desde el middleware de autenticación
        const userId = res.locals.userId;
        // Consulta la base de datos para obtener el saldo actual del usuario
        const user = yield (0, prismaClient_1.prisma)().usuario.findUnique({
            where: { id: userId },
            select: { balance: true },
        });
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        // Calcula el nuevo saldo del usuario sumando el valor del cupón al saldo actual
        const newBalance = user.balance + couponValue;
        // Inicia una transacción de base de datos para registrar la compra de cupón
        const createdTransaction = yield (0, prismaClient_1.prisma)().transaction.create({
            data: {
                amount: couponValue,
                type: "compra de cupón",
                userId: userId,
                date: new Date(),
                // date y userts se llenarán automáticamente por Prisma
            },
        });
        // Actualiza el saldo del usuario en la base de datos
        const updatedUser = yield (0, prismaClient_1.prisma)().usuario.update({
            where: { id: userId },
            data: { balance: newBalance },
        });
        // Devuelve la respuesta al frontend, incluyendo el nuevo saldo del usuario
        res.status(200).json({
            message: "Compra de cupón exitosa",
            newBalance: updatedUser.balance,
        });
    }
    catch (error) {
        console.error("Error en la compra de cupón:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
});
exports.buyCouponController = buyCouponController;
const getUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // El middleware de autenticación ya ha verificado el token y adjuntado los datos del usuario en res.locals
    // Puedes acceder a estos datos para obtener el ID del usuario autenticado
    const userId = res.locals.userId;
    try {
        // Consulta la base de datos para obtener el usuario autenticado por su ID
        const user = yield (0, prismaClient_1.prisma)().usuario.findUnique({
            where: { id: userId },
        });
        if (!user) {
            throw new Error("Usuario no encontrado");
        }
        // Devuelve el usuario autenticado en formato JSON
        res.json({ usuario: user });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener el usuario" });
    }
});
exports.getUserController = getUserController;
