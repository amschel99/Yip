import { Request } from "express";
import OpenAI from "openai";
export interface Session {
  open_ai_key: string;
}
export interface CustomRequest extends Request {
  session?: Session;
  open_ai_instance?: OpenAI;
}
