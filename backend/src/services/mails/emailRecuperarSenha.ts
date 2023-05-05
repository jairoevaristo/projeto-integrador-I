import nodemailer from "nodemailer";
import "dotenv/config";

type Usuario = {
	nome: string;
	email: string;
	recuperarSenha: string;
};

export const emailRecuperarSenha = (usuario: Usuario) => {
	const transport = nodemailer.createTransport({
		host: process.env.EMAIL_HOST,
		port: 465,
		secure: true,
		auth: {
			user: process.env.EMAIL_USER,
			pass: process.env.EMAIL_PASS,
		},
	});
	transport.sendMail(
		{
			from: "Equipe Apito Final <zairobastos@gmail.com>",
			to: `${usuario.nome} <${usuario.email}>`,
			subject: "Recuperação de senha",
			text: `Olá ${usuario.nome}, utilize o seguinte código como senha: ${usuario.recuperarSenha}.`,
		},
		(err, info) => {
			if (err) {
				console.log(err);
			} else {
				console.log("Email enviado com sucesso!");
			}
		}
	);
};
