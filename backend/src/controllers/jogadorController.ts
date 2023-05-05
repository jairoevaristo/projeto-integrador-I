import { Request, Response } from "express";
import { Jogador } from "../services/jogador/jogadorModel";
import sharp from "sharp";
import { unlink } from "fs/promises";

export const cadastrarJogador = async (req: Request, res: Response) => {
	const { nome, posicao, numero, imagem, timeId } = req.body;
	console.log(req.file);
	if (req.file) {
		const filename = `${req.file.filename}.png`;
		await sharp(req.file.path)
			.toFormat("png")
			.toFile(`../ApitoFinal-front/public/images/jogadores/${filename}`);

		await unlink(req.file.path);
		const img = `images/jogadores/${filename}`;
		let jogador = await Jogador.setJogador({
			nome,
			posicao,
			numero,
			imagem: img,
			timeId,
		});
		jogador
			? res.redirect("http://localhost:3000/jogadores")
			: res.status(400).send({ message: "Erro ao cadastrar jogador!" });
	} else {
		res.status(400).send({
			message: "Não foi possível cadastrar o jogador",
		});
	}
};

export const atualizarJogador = async (req: Request, res: Response) => {
	const { id, nome, posicao, numero, imagem, timeId } = req.body;
	let jogador = await Jogador.updateJogador({
		id,
		nome,
		posicao,
		numero,
		imagem,
		timeId,
	});
	jogador
		? res.status(201).send({ message: "Jogador atualizado com sucesso!" })
		: res.status(400).send({ message: "Erro ao atualizar jogador!" });
};

export const deletarJogador = async (req: Request, res: Response) => {
	const { id } = req.params;
	let jogador = await Jogador.deleteJogador(id);
	jogador
		? res.status(201).send({ message: "Jogador deletado com sucesso!" })
		: res.status(400).send({ message: "Erro ao deletar jogador!" });
};

export const listarJogadores = async (req: Request, res: Response) => {
	const { timeId } = req.params;
	console.log(timeId);
	let jogadores = await Jogador.getJogador(timeId);
	jogadores
		? res.status(201).send(jogadores)
		: res.status(400).send({ message: "Erro ao listar jogadores!" });
};
