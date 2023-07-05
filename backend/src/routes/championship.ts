import { Router } from "express";

import { CreateChampionshipController } from "../controllers/championship/CreateChampionshipController";
import { GetAllChampionshipController } from "../controllers/championship/GetAllChampionshipController";
import { GetChampionshipByName } from "../controllers/championship/GetChampionshipByName";
import { GetChampionshipById } from "../controllers/championship/GetChampionshipById";

import { ensureAutheticated } from "../middlewares/auth";
import { UpdateChampionshipController } from "../controllers/championship/UpdateChampionshipController";
import { DeleteChampionshipController } from "../controllers/championship/DeleteChampionshipController";

export const championshipRoutes = Router();

const createChampionshipController = new CreateChampionshipController();
const getAllChampionshipController = new GetAllChampionshipController();
const getChampionshipByName = new GetChampionshipByName();
const getChampionshipById = new GetChampionshipById();
const updateChampionshipController = new UpdateChampionshipController();
const deleteChampionshipController = new DeleteChampionshipController();

championshipRoutes.post('/cadastrar', ensureAutheticated, createChampionshipController.execute)
championshipRoutes.get('/lista-campeonato', ensureAutheticated, getAllChampionshipController.execute)
championshipRoutes.post('/search-name', ensureAutheticated, getChampionshipByName.execute)
championshipRoutes.post('/search-id', ensureAutheticated, getChampionshipById.execute)
championshipRoutes.post('/atualizar', ensureAutheticated, updateChampionshipController.execute)
championshipRoutes.post('/delete', ensureAutheticated, deleteChampionshipController.execute)
