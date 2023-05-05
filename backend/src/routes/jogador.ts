import { Router } from "express";
import * as Jogador from "../controllers/jogadorController";
import multer from "multer";

export const playerRoutes = Router();

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

playerRoutes.post("/cadastrar", upload.single("imagem"), Jogador.cadastrarJogador);
playerRoutes.post("/atualizar", Jogador.atualizarJogador);
playerRoutes.delete("/deletar/:id", Jogador.deletarJogador);
playerRoutes.get("/listar/:timeId", Jogador.listarJogadores);
