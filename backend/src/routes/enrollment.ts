import { Router } from "express";
import { CreateEnrollmentController } from "../controllers/enrollment/CreateEnrollmentController";
import { GetEnrollmentByChampionshipAndTeamController } from "../controllers/enrollment/GetEnrollmentByChampionshipAndTeamController";
import { ensureAutheticated } from "../middlewares/auth";
import { DeleteEnrollmentController } from "../controllers/enrollment/DeleteEnrollmentController";

export const enrollmentRoutes = Router();

const createEnrollmentController = new CreateEnrollmentController();
const getEnrollmentByChampionshipAndTeamController = new GetEnrollmentByChampionshipAndTeamController();
const deleteEnrollmentController = new DeleteEnrollmentController();

enrollmentRoutes.post("/cadastrar", ensureAutheticated, createEnrollmentController.execute);
enrollmentRoutes.post("/search", ensureAutheticated, getEnrollmentByChampionshipAndTeamController.execute);
enrollmentRoutes.post('/delete', ensureAutheticated, deleteEnrollmentController.execute);