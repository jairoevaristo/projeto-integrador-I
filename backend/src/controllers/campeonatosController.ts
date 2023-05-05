import { Request, Response } from "express";
import { Campeonatos } from "../services/campeonato/campeonatoModel";
import sharp from "sharp";
import { unlink } from "fs/promises";

export const paginaCampeonato = (req: Request, res: Response) => {
	res.send("Campeonatos");
};

export const criarCampeonato = async (req: Request, res: Response) => {
	const {
		nome,
		descricao,
		premiacao,
		logo,
		situacao,
		qtdTimes,
		userId,
		tipoCampeonato,
		dataInicio,
		dataFim,
	} = req.body;
	console.log(req.file);
	if (req.file) {
		const filename = `${req.file.filename}.png`;
		await sharp(req.file.path)
			.toFormat("png")
			.toFile(
				`../ApitoFinal-front/public/images/campeonatos/${filename}`
			);

		await unlink(req.file.path);
		const img = `images/campeonatos/${filename}`;
		let campeonato = await Campeonatos.setCampeonato({
			nome,
			descricao,
			premiacao,
			logo: img,
			situacao,
			qtdTimes,
			userId,
			tipoCampeonato,
			dataInicio,
			dataFim,
		});
		campeonato
			? res.redirect("http://localhost:3000/campeonato")
			: res.status(400).send({ message: "Erro ao criar campeonato!" });
	} else {
		console.log("Error");
	}
};

export const listarCampeonatos = async (req: Request, res: Response) => {
	const { id } = req.params;
	let campeonatos = await Campeonatos.getCampeonatos(id);

	campeonatos
		? res.status(200).send(campeonatos)
		: res.status(400).send({ message: "Erro ao listar campeonatos!" });
};

export const getBuscar = async (req: Request, res: Response) => {
	const { id } = req.params;
	let campeonato = await Campeonatos.busca(id);

	campeonato
		? res.status(200).send(campeonato)
		: res.status(400).send({ message: "Erro ao buscar campeonato!" });
};

export const deleteCampeonato = async (req: Request, res: Response) => {
	const { id } = req.params;
	let campeonato = await Campeonatos.deleteCampeonato(id);

	campeonato
		? res.status(200).send({ message: "Campeonato deletado com sucesso!" })
		: res.status(400).send({ message: "Erro ao deletar campeonato!" });
};

export const updateCampeonato = async (req: Request, res: Response) => {
	const {
		id,
		nome,
		descricao,
		logo,
		premiacao,
		qtdTimes,
		situacao,
		userId,
		dataFim,
		dataInicio,
	} = req.body;
	let atualizado = await Campeonatos.updateCampeonato({
		id,
		nome,
		descricao,
		logo,
		premiacao,
		qtdTimes,
		situacao,
		userId,
		dataFim,
		dataInicio,
	});

	atualizado
		? res
				.status(200)
				.send({ message: "Campeonato atualizado com sucesso!" })
		: res.status(400).send({ message: "Erro ao atualizar campeonato!" });
};
