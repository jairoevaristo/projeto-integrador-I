import { Router } from "express";

import { CreateUserController } from "../controllers/user/CreateUserController";
import { CurrentUserController } from "../controllers/user/CurrentUserController";
import { DeleteUserController } from "../controllers/user/DeleteUserController";
import { LoginUserController } from "../controllers/user/LoginUserController";
import { UpdateUserController } from "../controllers/user/UpdateUserController";

import { ensureAutheticated } from "../middlewares/auth";

export const userRoutes = Router();

const createUserController = new CreateUserController();
const loginUserController = new LoginUserController();
const updateUserController = new UpdateUserController();
const deleteUserController = new DeleteUserController();
const currentUserController = new CurrentUserController();

userRoutes.post("/cadastrar", createUserController.execute);
userRoutes.post("/login", loginUserController.execute);

userRoutes.post("/atualizar", ensureAutheticated, updateUserController.execute);
userRoutes.get("/apagar-conta", ensureAutheticated, deleteUserController.execute);
userRoutes.get("/me", ensureAutheticated, currentUserController.execute);
