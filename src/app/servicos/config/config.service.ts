import { Injectable } from '@angular/core';
import { usuario } from '.';
@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  cli: usuario = {
    COD: '',
    NOME: '',
    EMAIL: '',
    TIPOSANGUINEO: '',
    dataNascimento: '',
    CEP: '',
    CPF: '',
    SENHA: '',
    logado: false,
  };
  constructor() { }
}
