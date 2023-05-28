export interface User {
  id: string;
  nome: string;
  email: string;
  senha: string;
  imagem: string;
  ativo: boolean;
  recuperarSenha: string;
}
