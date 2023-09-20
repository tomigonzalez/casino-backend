"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = require("./src/config/config");
const prismaClient_1 = require("./src/config/prismaClient");
const authRouter_1 = require("./src/auth/authRouter");
const casinoRoute_1 = require("./src/casino/casinoRoute");
const corsMiddleware_1 = require("./src/middleware/corsMiddleware");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)(corsMiddleware_1.corsOptions));
app.use(express_1.default.json());
const port = process.env.PORT || 3001;
const server = app.listen(port, () => {
    (0, prismaClient_1.createPrismaClient)();
    (0, config_1.getConfig)();
    console.log("estoy andando");
    console.log(`Example app listening on port ${port}!`);
});
app.use("/auth", authRouter_1.authRouter);
app.use("/casino", casinoRoute_1.balanceRouter);
server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;
