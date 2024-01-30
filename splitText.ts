import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { SupabaseVectorStore } from "langchain/vectorstores/supabase";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import dotenv from "dotenv";
import express, { Response, Request } from "express";
import { readFile } from "fs/promises";
import { client } from "./db/supabase_client";
import { CustomRequest } from "./types";
dotenv.config();

const { OPEN_AI_KEY } = process.env;

export const split_text_router = express.Router();
const split_text = async (req: Request, res: Response) => {
  try {
    const text = await readFile("./dummy_info.txt", { encoding: "utf8" });

    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 500,
      chunkOverlap: 50,
    });
    const output = await splitter.createDocuments([text]);
    console.log(output);

    //
    SupabaseVectorStore.fromDocuments(
      output,
      new OpenAIEmbeddings({ openAIApiKey: OPEN_AI_KEY }),
      {
        client,
        tableName: `documents`,
      }
    )
      .then((data) => {
        console.log(`success`);
      })
      .catch((error) => {
        console.log(`
there was an error: ${error}
`);
        throw new Error(error);
      });
    res.status(200).send(output);
  } catch (e) {
    console.log(e);
  }
};
split_text_router.route("/").get(split_text);
