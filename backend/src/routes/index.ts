import { Router } from "express";

import { championsRoutes } from "./campeonatos";
import { playerRoutes } from "./jogador";
import { matchRoutes } from "./partida";
import { timeRoutes } from "./times";
import { userRoutes } from "./user";

export const router = Router();  

router.use("/campeonato", championsRoutes);
router.use("/times", timeRoutes);
router.use("/usuario", userRoutes);
router.use("/partida", matchRoutes);
router.use("/jogador", playerRoutes);

