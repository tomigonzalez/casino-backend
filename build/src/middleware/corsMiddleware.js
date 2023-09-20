"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsOptions = void 0;
exports.corsOptions = {
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
};
