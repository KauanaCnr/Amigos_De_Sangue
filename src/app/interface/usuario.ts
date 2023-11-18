export interface usuario {
    COD: string;
    NOME: string;
    EMAIL: String;
    TIPOSANGUINEO!: String;
dataNascimento!: String;
CEP!: String;
CPF!: String;
SENHA!: String;
logado: boolean;
}