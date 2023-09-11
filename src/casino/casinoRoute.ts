import { authMiddleware } from "./../middleware/authMiddleware";
import { Router } from "express";
import {
  buyCouponController,
  getBalanceController,
  getUserController,
} from "./casinoControllers";

export const balanceRouter = Router();

// Aplicar middleware de autenticación a todas las rutas en balanceRouter
balanceRouter.use(authMiddleware);

// Ruta para obtener el saldo del usuario autenticado
balanceRouter.get("/saldo", getBalanceController);

// Ruta para comprar un cupón

balanceRouter.post("/comprar-cupon", buyCouponController);

// Ruta para tener informacion del usuario
balanceRouter.get("/usuario", getUserController);
