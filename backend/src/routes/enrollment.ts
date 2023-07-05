import { Router } from "express";
import { CreateEnrollmentController } from "../controllers/enrollment/CreateEnrollmentController";
import { GetEnrollmentByChampionshipAndTeamController } from "../controllers/enrollment/GetEnrollmentByChampionshipAndTeamController";
import { ensureAutheticated } from "../middlewares/auth";
import { DeleteEnrollmentController } from "../controllers/enrollment/DeleteEnrollmentController";
import { GetEnrollmentByChampionshipController } from "../controllers/enrollment/GetEnrollmentByChampionshipController";
import { GetEnrollmentByTeamController } from "../controllers/enrollment/GetEnrollmentByTeamController";

export const enrollmentRoutes = Router();

const createEnrollmentController = new CreateEnrollmentController();
const getEnrollmentByChampionshipAndTeamController = new GetEnrollmentByChampionshipAndTeamController();
const deleteEnrollmentController = new DeleteEnrollmentController();
const getEnrollmentByChampionshipController = new GetEnrollmentByChampionshipController();
const getEnrollmentByTeamController = new GetEnrollmentByTeamController();

enrollmentRoutes.post("/cadastrar", ensureAutheticated, createEnrollmentController.execute);
enrollmentRoutes.post("/search", ensureAutheticated, getEnrollmentByChampionshipAndTeamController.execute);
enrollmentRoutes.post('/delete', ensureAutheticated, deleteEnrollmentController.execute); 
enrollmentRoutes.post('/search-campeonato', ensureAutheticated, getEnrollmentByChampionshipController.execute);
enrollmentRoutes.post('/search-time', ensureAutheticated, getEnrollmentByTeamController.execute);