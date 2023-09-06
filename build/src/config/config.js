"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfig = void 0;
const getAcessToken = () => {
    if (process.env.ACCESS_TOKEN_SECRET) {
        return process.env.ACCESS_TOKEN_SECRET;
    }
    throw new Error("ACCES TOKEN SECRET NOT PRESENT");
};
const getRefreshToken = () => {
    if (process.env.REFRESH_TOKEN_SECRET) {
        return process.env.REFRESH_TOKEN_SECRET;
    }
    throw new Error("REFRESH TOKEN SECRET NOT PRESENT");
};
let config = null;
const getConfig = () => {
    if (config) {
        return config;
    }
    config = {
        accesTokenSecret: getAcessToken(),
        refreshTokenSecret: getRefreshToken(),
    };
    return config;
};
exports.getConfig = getConfig;
