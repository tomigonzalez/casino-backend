"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.balanceRouter = void 0;
const authMiddleware_1 = require("./../middleware/authMiddleware");
const express_1 = require("express");
const casinoControllers_1 = require("./casinoControllers");
exports.balanceRouter = (0, express_1.Router)();
// Aplicar middleware de autenticación a todas las rutas en balanceRouter
exports.balanceRouter.use(authMiddleware_1.authMiddleware);
// Ruta para obtener el saldo del usuario autenticado
exports.balanceRouter.get("/saldo", casinoControllers_1.getBalanceController);
// Ruta para comprar un cupón
exports.balanceRouter.post("/comprar-cupon", casinoControllers_1.buyCouponController);
// Ruta para tener informacion del usuario
exports.balanceRouter.get("/usuario", casinoControllers_1.getUserController);
