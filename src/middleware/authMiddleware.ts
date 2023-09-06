import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { getConfig } from "../config/config";

//AUTENTICACION
export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const header = req.headers.authorization;
  if (!header) {
    res.status(401).json({ message: "NOT AUTHORIZED: TOKEN NOT PRESENT" });
    return;
  }
  const token = header.split(" ")[1];
  try {
    const data = jwt.verify(token, getConfig().accesTokenSecret);
    if (data) {
      res.locals.email = (data as any).email;
      res.locals.userId = (data as any).userId;
      next();
      return;
    }
  } catch (err: any) {
    if (err.name === "TokenExpiredError") {
      res.status(401).json({ message: "NOT AUTHORIZED: TOKEN EXPIRED" });
      return;
    }
    res.status(401).json({ message: "NOT AUTHORIZED: TOKEN NOT VALID" });
    return;
  }

  res.status(401).json({ message: "NOT AUTHORIZED: TOKEN NOT VALID" });
  return;
};
