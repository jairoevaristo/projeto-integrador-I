import "dotenv/config";
import express, { Request, Response, ErrorRequestHandler } from "express";
import cors from "cors";

import { MulterError } from "multer";
import { router } from "./routes";
import { AppLogger } from "./logger/AppLogger";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.use((req: Request, res: Response) => {
  res.status(404).send("Página não encontrada");
});

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  res.status(400); // 400 Bad Request

  if (err instanceof MulterError) {
    res.json({
      error: err.code,
    });
  } else {
    res.json({
      error: err.message,
    });
  }
};
app.use(errorHandler);

app.listen(process.env.PORT || 3001, () => {
  new AppLogger().success("Servidor HTTP funcionando!");
});
