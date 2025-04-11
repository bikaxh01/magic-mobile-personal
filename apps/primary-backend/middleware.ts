import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const header = req.headers.authorization;
  const publicKey = process.env.CLERK_JWT_PUBLIC_KEY as string;
  if(!header){
    res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
      return;
  }

  const token = header.split(" ")[1]
  if (!token) {
    res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
    return;
  }

  const decoded = jwt.verify(token, publicKey, { algorithms: ["RS256"] });

  const userId = (decoded as any).sub;

  if (!userId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  req.userId = userId;
  next();
}
