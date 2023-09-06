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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshToken = exports.register = exports.login = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prismaClient_1 = require("../config/prismaClient");
const config_1 = require("../config/config");
const login = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, prismaClient_1.prisma)().usuario.findUnique({ where: { email: email } });
        if (user === null) {
            throw new Error("User not found");
        }
        const result = yield bcrypt_1.default.compare(password, user.password);
        if (result) {
            const accessToken = jsonwebtoken_1.default.sign({ email: email, userId: user.id }, (0, config_1.getConfig)().accesTokenSecret, {
                expiresIn: "1h",
            });
            const refreshToken = jsonwebtoken_1.default.sign({ email: email }, (0, config_1.getConfig)().refreshTokenSecret, {
                expiresIn: "72h",
            });
            return { accessToken: accessToken, refreshToken: refreshToken };
        }
        throw new Error("Invalid password");
    }
    catch (err) {
        throw err;
    }
});
exports.login = login;
const register = (email, password, name) => __awaiter(void 0, void 0, void 0, function* () {
    // validar que el email no exista!
    const hash = yield bcrypt_1.default.hash(password, 10);
    try {
        const user = yield (0, prismaClient_1.prisma)().usuario.create({
            data: {
                email: email,
                password: hash,
                // Debes proporcionar un valor para todas las propiedades requeridas
                name: name,
                balance: 0.0, // Proporciona un saldo inicial
            },
        });
        return user;
    }
    catch (err) {
        throw err;
    }
});
exports.register = register;
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = jsonwebtoken_1.default.verify(token, (0, config_1.getConfig)().refreshTokenSecret);
        if (data) {
            const dataparsed = data;
            const user = yield (0, prismaClient_1.prisma)().usuario.findUnique({
                where: { email: dataparsed.email },
            });
            if (user === null) {
                throw new Error("USER NOT FOUND");
            }
            const accessToken = jsonwebtoken_1.default.sign({ email: user.email, role: "ADMIN" }, (0, config_1.getConfig)().accesTokenSecret, {
                expiresIn: "1h",
            });
            const refreshToken = jsonwebtoken_1.default.sign({ email: user.email }, (0, config_1.getConfig)().refreshTokenSecret, {
                expiresIn: "72h",
            });
            return { accessToken: accessToken, refreshToken: refreshToken };
        }
    }
    catch (err) {
        if (err.name === "TokenExpiredError") {
            throw new Error("NOT AUTHORIZED: TOKEN EXPIRED");
        }
        throw new Error("NOT AUTHORIZED: TOKEN NOT VALID");
    }
    throw new Error("NOT AUTHORIZED: TOKEN NOT VALID");
});
exports.refreshToken = refreshToken;
