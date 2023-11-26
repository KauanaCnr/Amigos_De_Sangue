import { Injectable } from '@angular/core';
import { usuario } from 'src/app/interface/usuario';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  user: usuario = {
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
