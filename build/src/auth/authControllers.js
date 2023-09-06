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
exports.refreshTokenController = exports.registerController = exports.loginController = void 0;
const authLogic_1 = require("./authLogic");
const loginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const result = yield (0, authLogic_1.login)(email, password);
        res.json(result);
        return;
    }
    catch (err) {
        res.status(500).send(err);
        return;
    }
});
exports.loginController = loginController;
const registerController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, name } = req.body;
    try {
        const result = yield (0, authLogic_1.register)(email, password, name);
        res.json(result);
        return;
    }
    catch (err) {
        res.status(500).send(err);
        return;
    }
});
exports.registerController = registerController;
const refreshTokenController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const header = req.headers.authorization;
    if (!header) {
        res.status(401).json({ message: "NOT AUTHORIZED: TOKEN NOT PRESENT" });
        return;
    }
    const token = header.split(" ")[1];
    try {
        const result = yield (0, authLogic_1.refreshToken)(token);
        res.json(result);
        return;
    }
    catch (err) {
        res.status(500).json({ message: "NOT AUTHORIZED" });
        return;
    }
});
exports.refreshTokenController = refreshTokenController;
