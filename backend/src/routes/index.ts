import { Router } from "express";

import { userRoutes } from "./user";
import { championshipRoutes } from "./championship";
import { teamRoutes } from "./team";
import { enrollmentRoutes } from "./enrollment";

export const router = Router();  

router.use("/usuario", userRoutes);
router.use("/campeonato", championshipRoutes);
router.use("/time", teamRoutes);
router.use("/inscricao", enrollmentRoutes);