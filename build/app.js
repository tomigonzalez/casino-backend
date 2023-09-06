"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = require("./src/config/config");
const prismaClient_1 = require("./src/config/prismaClient");
const authRouter_1 = require("./src/auth/authRouter");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const port = process.env.PORT || 3001;
app.use("/auth", authRouter_1.authRouter);
const server = app.listen(port, () => {
    (0, prismaClient_1.createPrismaClient)();
    (0, config_1.getConfig)();
    console.log(`Example app listening on port ${port}!`);
});
server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;
