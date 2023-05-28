import { Router } from "express";

import { CreateChampionshipController } from "../controllers/championship/CreateChampionshipController";

import { ensureAutheticated } from "../middlewares/auth";

export const championshipRoutes = Router();

const createChampionshipController = new CreateChampionshipController();

championshipRoutes.post('/cadastrar', ensureAutheticated, createChampionshipController.execute)
