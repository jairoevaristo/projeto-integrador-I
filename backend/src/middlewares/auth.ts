import { NextFunction, Request, Response } from "express";
import jsonWebToken from "jsonwebtoken";
import 'dotenv/config'

type IPayloadToken = {
  sub: string;
};

export function ensureAutheticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authorization = req.headers["authorization"];

  if (!authorization) {
    return res.status(400).json({ message: "Header authorization not found" });
  }

  const [bearer, token] = authorization.split(" ");

  if (bearer !== 'Bearer') {
    return res.status(400).json({ message: "Token type is not Bearer" });
  }

  try {
    const { sub } = jsonWebToken.verify(
      token,
      process.env.JWT_SECRET as string
    ) as IPayloadToken;

    req.user_id = sub;
    return next();

  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      return res.status(400).json({ error: "Token expired" });
    }

    console.log({error})

    return res.status(400).json({ error: "invalid token" });
  }
}