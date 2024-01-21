import dotenv from "dotenv";
import express, { Response, Request } from "express";
import { CustomRequest } from "./types";

dotenv.config();

export const generate_router = express.Router();

export const generate = async (req: CustomRequest, res: Response) => {
  let openai = req.open_ai_instance;
  if (openai !== undefined) {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are an article writer and SEO specialist ",
        },
        {
          role: "user",
          content: "Write an artical about programming and social anxiety",
        },
      ],
      model: "gpt-3.5-turbo",
    });
    res.status(200).send(completion.choices[0].message.content);
  }
};
generate_router.route("/generate").get(generate);
