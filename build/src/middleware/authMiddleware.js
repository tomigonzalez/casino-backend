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
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config/config");
//AUTENTICACION
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const header = req.headers.authorization;
    if (!header) {
        res.status(401).json({ message: "NOT AUTHORIZED: TOKEN NOT PRESENT" });
        return;
    }
    const token = header.split(" ")[1];
    try {
        const data = jsonwebtoken_1.default.verify(token, (0, config_1.getConfig)().accesTokenSecret);
        if (data) {
            res.locals.email = data.email;
            res.locals.userId = data.userId;
            next();
            return;
        }
    }
    catch (err) {
        if (err.name === "TokenExpiredError") {
            res.status(401).json({ message: "NOT AUTHORIZED: TOKEN EXPIRED" });
            return;
        }
        res.status(401).json({ message: "NOT AUTHORIZED: TOKEN NOT VALID" });
        return;
    }
    res.status(401).json({ message: "NOT AUTHORIZED: TOKEN NOT VALID" });
    return;
});
exports.authMiddleware = authMiddleware;
