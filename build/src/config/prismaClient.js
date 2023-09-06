"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = exports.createPrismaClient = void 0;
const client_1 = require("@prisma/client");
let prismaClient;
function createPrismaClient() {
    prismaClient = new client_1.PrismaClient();
    // prismaClient.$use(async (params:any, next:any) => {
    //   // Check incoming query type
    //   if (params.action == "delete") {
    //     // Delete queries
    //     // Change action to an update
    //     params.action = "update";
    //     params.args["data"] = { deleted_at: new Date() };
    //   }
    //   return next(params);
    // });
    return prismaClient;
}
exports.createPrismaClient = createPrismaClient;
function prisma() {
    if (!prismaClient) {
        prismaClient = createPrismaClient();
    }
    return prismaClient;
}
exports.prisma = prisma;
