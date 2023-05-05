import { Request, Response } from "express";
import JWT from "jsonwebtoken";

type user = {
	id: string;
	email: string;
};

export const Authorization = (req: Request, res: Response) => {
	const { token } = req.body;
	if (token) {
		const decoded: user | any = JWT.verify(
			token,
			process.env.JWT_SECRET as string
		);
		if (decoded) {
			res.json({ user: { id: decoded.id, email: decoded.email } });
		} else {
			res.json({ message: "Token inválido!" }).status(400);
		}
	}
};

export const Auth = (req: Request, res: Response) => {
	res.send("teste");
};
