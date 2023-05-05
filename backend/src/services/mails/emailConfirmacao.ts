import nodemailer from "nodemailer";
import "dotenv/config";

export const emailConfirmacao = (nome: string, email: string, id: string) => {
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
			to: `${nome} <${email}>`,
			subject: "Bem vindo ao Apito Final",
			text: `Olá ${nome}, seja bem vindo ao Apito Final!
Agradecemos por se cadastrar no nosso site.`,
			html: `<a href="http://localhost:3333/usuario/confirmar/${id}"> Confirme seu cadastro</a>`,
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
