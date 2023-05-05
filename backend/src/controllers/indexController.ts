import { Request, Response } from "express";

export const paginaInicial = (req: Request, res: Response) => {
	res.send("Página Inicial");
};
