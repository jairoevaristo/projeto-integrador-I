import * as yup from "yup";

export const signInSchemaValidator = yup.object({
  email: yup.string().email("Informe um e-mail válido").required("Este campo é obrigatório"),
  senha: yup.string().required("Este campo é obrigatório"),
}).required();

export const signUpSchemaValidator = yup.object({
  nome: yup.string().required("Este campo é obrigatório"),
  email: yup.string().email("Informe um e-mail válido").required("Este campo é obrigatório"),
  senha: yup.string().required("Este campo é obrigatório"),
  confirmar_senha: yup.string()
     .oneOf([yup.ref('senha')], 'As senhas são diferentes').required("Este campo é obrigatório")
})