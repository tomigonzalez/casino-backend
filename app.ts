import express, { Request, Response } from "express";
import { getConfig } from "./src/config/config";
import { createPrismaClient } from "./src/config/prismaClient";
import { authRouter } from "./src/auth/authRouter";
import { balanceRouter } from "./src/casino/casinoRoute";
import { corsOptions } from "./src/middleware/corsMiddleware";
import cors from "cors";

const app = express();

app.use(cors(corsOptions));

app.use(express.json());

const port = process.env.PORT || 3001;

const server = app.listen(port, () => {
  createPrismaClient();
  getConfig();
  console.log("estoy andando");
  console.log(`Example app listening on port ${port}!`);
});

app.use("/auth", authRouter);

app.use("/casino", balanceRouter);

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;
