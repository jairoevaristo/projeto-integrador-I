import { Router } from "express";
import * as Times from "../controllers/timesController";
import multer from "multer";

export const timeRoutes = Router();

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


timeRoutes.get("/", Times.paginaTimes);
timeRoutes.post("/cadastrar", upload.single("escudo"), Times.cadastrarTime);
timeRoutes.post("/update", Times.updateTime);
timeRoutes.delete("/delete/:id", Times.deleteTime);
timeRoutes.get("/buscar/:id", Times.listarTimes);
timeRoutes.get("/buscarTimesId/:id/:userId", Times.listarTimesId);
