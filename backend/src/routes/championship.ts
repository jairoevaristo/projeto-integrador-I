import { Router } from "express";

import { CreateChampionshipController } from "../controllers/championship/CreateChampionshipController";
import { GetAllChampionshipController } from "../controllers/championship/GetAllChampionshipController";
import { GetChampionshipByName } from "../controllers/championship/GetChampionshipByName";

import { ensureAutheticated } from "../middlewares/auth";

export const championshipRoutes = Router();

const createChampionshipController = new CreateChampionshipController();
const getAllChampionshipController = new GetAllChampionshipController();
const getChampionshipByName = new GetChampionshipByName();

championshipRoutes.post('/cadastrar', ensureAutheticated, createChampionshipController.execute)
championshipRoutes.get('/lista-campeonato', ensureAutheticated, getAllChampionshipController.execute)
championshipRoutes.post('/search', ensureAutheticated, getChampionshipByName.execute)
