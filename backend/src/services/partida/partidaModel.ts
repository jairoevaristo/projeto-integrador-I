import { prisma } from "../../prisma";
type Partida = {
	data: string;
	horario: string;
	local: string;
	campeonatoId: string;
	time1Id: string;
	time2Id: string;
	placar1: number;
	placar2: number;
	userId?: string;
};

interface updatePartida extends Partida {
	id: string;
}

export const Partidas = {
	setPartida: async ({
		data,
		horario,
		local,
		campeonatoId,
		time1Id,
		time2Id,
		placar1,
		placar2,
		userId,
	}: Partida) => {
		let cad = await prisma.partida
			.create({
				data: {
					data,
					horario,
					local,
					campeonatoId,
					time1Id,
					time2Id,
					placar1,
					placar2,
					userId,
				},
			})
			.then((partida) => {
				return true;
			})
			.catch((err) => {
				return false;
			});
		return cad;
	},
	deletePartida: async (id: string) => {
		let deletado = await prisma.partida
			.delete({
				where: {
					id,
				},
			})
			.then((partida) => {
				return true;
			})
			.catch((err) => {
				return false;
			});
		return deletado;
	},
	updatePartida: async ({
		id,
		campeonatoId,
		data,
		horario,
		local,
		placar1,
		placar2,
		time1Id,
		time2Id,
	}: updatePartida) => {
		let atualizado = await prisma.partida
			.update({
				where: {
					id,
				},
				data: {
					campeonatoId,
					data,
					horario,
					local,
					placar1,
					placar2,
					time1Id,
					time2Id,
				},
			})
			.then((partida) => {
				return true;
			})
			.catch((err) => {
				return false;
			});
		return atualizado;
	},
	listarPartidas: async (campeonatoId: string) => {
		let lista = await prisma.partida
			.findMany({
				take: 6,
				where: {
					campeonatoId,
				},
			})
			.then((partida) => {
				return partida;
			})
			.catch((err) => {
				return false;
			});
		return lista;
	},
	listarTodasPartidas: async (id: string) => {
		let lista = await prisma.partida
			.findMany({
				take : 6,
				where:{
					userId:id,
				},
			})
			.then((partida) => {
				return partida;
			})
			.catch((err) => {
				return false;
			});
		return lista;
	},
};
