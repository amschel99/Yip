import dotenv from "dotenv";
import { Response, NextFunction } from "express";
import { CustomRequest } from "./types";
import OpenAI, { ClientOptions } from "openai";
dotenv.config();
let config: ClientOptions;
export const verifySession = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["Session"];

  if (!authHeader) {
    config = {
      apiKey: process.env.TEST_KEY,
    };
    const openai = new OpenAI(config);
    req.open_ai_instance = openai;
    return next();
  }

  const session = JSON.parse(authHeader[0]);
  req.session = session;
  config = {
    apiKey: req.session?.open_ai_key ?? process.env.TEST_KEY,
  };
  const openai = new OpenAI(config);
  req.open_ai_instance = openai;
  next();
};
