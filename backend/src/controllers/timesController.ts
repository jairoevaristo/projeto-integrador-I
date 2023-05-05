import { Request, Response } from "express";
import { Times } from "../services/time/timeModel";
import sharp from "sharp";
import { unlink } from "fs/promises";

export const paginaTimes = (req: Request, res: Response) => {
	res.send("Times");
};

export const cadastrarTime = async (req: Request, res: Response) => {
	const { nome, abreviacao, userId } = req.body;
	if (req.file) {
		const filename = `${req.file.filename}.png`;
		await sharp(req.file.path)
			.toFormat("png")
			.toFile(`../ApitoFinal-front/public/images/${filename}`);

		await unlink(req.file.path);
		const img = `images/${filename}`;
		let time = await Times.setTime({
			nome,
			abreviacao: abreviacao.toUpperCase(),
			escudo: img,
			userId,
		});
		time
			? res.redirect("http://localhost:3000/times")
			: res.send({ message: "Erro ao cadastrar time!" }).status(400);
	} else {
		res.send({
			message: "Não foi possível cadastrar o time",
		}).status(400);
	}
};

export const deleteTime = async (req: Request, res: Response) => {
	const { id } = req.params;
	let time = await Times.deleteTime(id);

	time
		? res.status(200).send({ message: "Time deletado com sucesso!" })
		: res.status(400).send({ message: "Erro ao deletar time!" });
};

export const updateTime = async (req: Request, res: Response) => {
	const { id, nome, abreviacao, escudo } = req.body;
	let atualizado = await Times.updateTime({
		id,
		nome,
		abreviacao,
		escudo,
	});

	atualizado
		? res.status(200).send({ message: "Time atualizado com sucesso!" })
		: res.status(400).send({ message: "Erro ao atualizar time!" });
};

export const listarTimes = async (req: Request, res: Response) => {
	const { id } = req.params;
	let times: any = await Times.getTimes(id as string);
	if (times) {
		res.status(200).send(times);
	} else {
		res.status(400).send({ message: "Erro ao listar times!" });
	}
};

export const listarTimesId = async (req: Request, res: Response) => {
	const { id,userId } = req.params;
	let times: any = await Times.getTimesId(id as string, userId as string);
	if (times) {
		res.status(200).send(times);
	} else {
		res.status(400).send({ message: "Erro ao listar times!" });
	}
};
