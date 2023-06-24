import { Router } from "express";

import { CreateTeamController } from "../controllers/team/CreateTeamController";
import { GetAllTeamController } from "../controllers/team/GetAllTeamController";
import { GetTeamByName } from "../controllers/team/GetTeamByName";
import { GetTeamById } from "../controllers/team/GetTeamById";

import { ensureAutheticated } from "../middlewares/auth";
import { DeleteTeamController } from "../controllers/team/DeleteTeamController";
import { UpdateTeamController } from "../controllers/team/UpdateTeamController";

export const teamRoutes = Router();

const createTeamController = new CreateTeamController();
const getAllTeamController = new GetAllTeamController();
const getTeamByNameController = new GetTeamByName();
const getTeamByIdController = new GetTeamById();
const deleteTeamController = new DeleteTeamController();
const updateTeamController = new UpdateTeamController();

teamRoutes.post('/cadastrar', ensureAutheticated, createTeamController.execute);
teamRoutes.get('/lista-time', ensureAutheticated, getAllTeamController.execute);
teamRoutes.post('/search', ensureAutheticated, getTeamByNameController.execute);
teamRoutes.post('/search-id', ensureAutheticated, getTeamByIdController.execute);
teamRoutes.post('/delete', ensureAutheticated, deleteTeamController.execute);
teamRoutes.post('/atualizar', ensureAutheticated, updateTeamController.execute);