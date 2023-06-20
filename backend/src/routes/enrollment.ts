import { Router } from "express";
import { CreateEnrollmentController } from "../controllers/enrollment/CreateEnrollmentController";
import { ensureAutheticated } from "../middlewares/auth";

export const userRoutes = Router();

const createEnrollmentController = new CreateEnrollmentController();

userRoutes.post("/cadastrar", ensureAutheticated, createEnrollmentController.execute);
