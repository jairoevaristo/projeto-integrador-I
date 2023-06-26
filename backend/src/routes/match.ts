import { Router } from "express";

import { CreateMatchController } from "../controllers/matches/CreateMatchController";
import { GetAllMatchesController } from "../controllers/matches/GetAllMatchesController";
import { GetMatchById } from "../controllers/matches/GetMatchById";
import { ensureAutheticated } from "../middlewares/auth";
import { DeleteMatchController } from "../controllers/matches/DeleteMatchController";
import { UpdateMatchController } from "../controllers/matches/UpdateMatchController";

export const matchRoutes = Router();

const createMatchController = new CreateMatchController();
const getAllMatchesController = new GetAllMatchesController();
const getMatchByIdController = new GetMatchById();
const deleteMatchController = new DeleteMatchController();
const updateMatchController = new UpdateMatchController();

matchRoutes.post('/cadastrar', ensureAutheticated, createMatchController.execute);
matchRoutes.get('/lista-partidas', ensureAutheticated, getAllMatchesController.execute);
matchRoutes.post('/search-id', ensureAutheticated, getMatchByIdController.execute);
matchRoutes.post('/delete', ensureAutheticated, deleteMatchController.execute);
matchRoutes.post('/atualizar', ensureAutheticated, updateMatchController.execute);
