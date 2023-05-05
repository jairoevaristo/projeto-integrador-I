import { Router } from "express";
import * as Campeonato from "../controllers/campeonatosController";
import multer from "multer";

export const championsRoutes = Router();

const upload = multer({
	dest: "./tmp",
	fileFilter: (req, file, cb) => {
		const allowedTypes: string[] = [
			"image/jpeg",
			"image/png",
			"image/jpg",
			"image/svg+xml",
			"image/svg",
		];
		if (allowedTypes.includes(file.mimetype)) {
			cb(null, true);
		} else {
			cb(new Error("Tipo de arquivo"));
		}
	},
});


championsRoutes.get("/", Campeonato.paginaCampeonato);
championsRoutes.post(
	"/criarCampeonato",
	upload.single("logo"),
	Campeonato.criarCampeonato
);
championsRoutes.get("/listarCampeonatos/:id", Campeonato.listarCampeonatos);
championsRoutes.post("/updateCampeonato", Campeonato.updateCampeonato);
championsRoutes.delete("/deleteCampeonato/:id", Campeonato.deleteCampeonato);
championsRoutes.get("/buscar/:id", Campeonato.getBuscar);
