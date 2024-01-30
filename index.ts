import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import express from "express";
import { split_text_router } from "./splitText";

import { generate_router } from "./logic";
import { verifySession } from "./userMiddleware";
dotenv.config();

export const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(express.urlencoded());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "*",
  })
);
//app.use(verifySession);
app.use("/", generate_router);
app.use("/split_text", split_text_router);
app.listen(process.env.PORT, () => {
  console.log(`App listening on ${process.env.PORT}`);
});
