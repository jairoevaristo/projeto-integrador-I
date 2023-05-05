module.exports = {
	content: [
		"./src/**/*.tsx",
		"./components/**/*.tsx",
		"./views/**/*.tsx",
		"./routes/**/*.tsx",
	],
	darkMode: 'class',
	theme: {
		extend: {
			width: {
				104.43: "6.527",
				padrao_tela: "85.25",
				telaCards: "70%",
				card: "30%",
				tabela: "10%",
			},
			height: {
				102.3: "6.794",
				padrao_tela: "47.953",
				13: "54px",
			},
			fontSize: {
				menu: "1.432rem",
				titleLogin: "2.375rem",
			},
			fontFamily: {
				padrao: ["League Spartan", "sans-serif"],
				sans: ["Poppins", "sans-serif"],
				home: ["League Spartan", "sans-serif"],
			},
			colors: {
				preto: "#020905",
				"verde-claro": "#00C041",
				titleLoginFont: "#3C3C3C",
				subtitleLogin: "#A2A2A2",
				labelLogin: "#7C7C7C",
				input: "#F9F9F9",
				borderInput: "#E6E6E6",
				borderMenu: "#FBFCFF",
				navMenu: "#959FA8",
				navMenuAtivo: "#020905",
				telaSubtitulo: "rgba(2, 9, 5, 0.5)",
				borderCard: "rgba(0, 0, 0, 0.05)",
				fontCard: "rgba(2, 9, 5, 0.8)",
				borderForm: "#f3f4f7",
				buttonCard: "#018D30",
				backgroundRecuperar: "#F9F9F9",
				borderDireitaTimes: "#AAAAAA",
				bgTabela: "#F5F5F5",
			},
			lineHeight: {
				12: "4.90437rem",
			},
			borderRadius: {
				inputLogin: "0.1875rem",
			},
			borderWidth: {
				inputBorder: "0.0625rem",
			},
			boxShadow: {
				menu: "0px 4px 4px rgba(0, 0, 0, 0.05)",
			},
			spacing: {
				gapCards: "5%",
			},
		},
		container: {
			center: true,
			padding: "1rem",
			screens: {
				lg: "1124px",
				xl: "1200px",
				"2xl": "1124px",
			},
		},
	},
	plugins: [require("@tailwindcss/forms")],
};
