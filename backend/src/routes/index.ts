import { Router } from "express";

import { userRoutes } from "./user";
import { championshipRoutes } from "./championship";

export const router = Router();  

router.use("/usuario", userRoutes);
router.use("/campeonato", championshipRoutes);