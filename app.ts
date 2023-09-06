import express, { Request, Response } from "express";
import { getConfig } from "./src/config/config";
import { createPrismaClient } from "./src/config/prismaClient";
import { authRouter } from "./src/auth/authRouter";

const app = express();

app.use(express.json());

const port = process.env.PORT || 3001;

app.use("/auth", authRouter);

const server = app.listen(port, () => {
  createPrismaClient();
  getConfig();
  console.log("estoy andando");
  console.log(`Example app listening on port ${port}!`);
});

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;
