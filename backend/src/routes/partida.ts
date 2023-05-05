import { Router } from "express";
import * as Partida from "../controllers/partidaController";

export const matchRoutes = Router();

matchRoutes.post("/criarPartida", Partida.criarPartida);
matchRoutes.post("/updatePartida", Partida.updatePartida);
matchRoutes.delete("/deletePartida/:id", Partida.deletePartida);
matchRoutes.post("/listarPartidas", Partida.listarPartidas);
matchRoutes.get("/listarTodasPartidas/:id", Partida.listarTodasPartidas);
