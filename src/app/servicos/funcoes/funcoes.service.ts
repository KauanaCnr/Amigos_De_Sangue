import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FuncoesService {

  constructor() { }


  ordenarArrayString(primeiroClique: boolean, keyParafiltrar: string, array: any[]): Observable<any> {
    return new Observable(subscriber => {
      if (primeiroClique) {
        array.sort(this.compareValues(keyParafiltrar));
      } else {
        array.sort(this.compareValues(keyParafiltrar, 'desc'));
      }
      subscriber.next(array);
      subscriber.complete();

    });
  }

  compareValues(key: string, order = 'asc') {

    return function innerSort(a: { [x: string]: any; hasOwnProperty: (arg0: string) => any; }, b: { [x: string]: any; hasOwnProperty: (arg0: string) => any; }) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        return 0;
      }
      const valorA = a[key];
      const valorB = b[key];
      let qtdNAN = 0;
      let auxA;
      let auxB;


      if (!isNaN(Number(valorA))) {
        auxA = Number(valorA);
      } else {
        auxA = valorA.toUpperCase();
        qtdNAN++;
      }


      if (!isNaN(Number(valorB))) {
        auxB = Number(valorB);
      } else {
        auxB = valorB.toUpperCase();
        qtdNAN++;
      }
      if (qtdNAN === 1) {
        if (!isNaN(auxB)) {
          auxB = auxB.toString();
        }
        if (!isNaN(auxA)) {
          auxA = auxA.toString();
        }

      }
      let comparison = 0;
      if (auxA > auxB) {
        comparison = 1;
      } else if (auxA < auxB) {
        comparison = -1;
      }
      return (
        (order === 'desc') ? (comparison * -1) : comparison
      );
    };
  }

  reOrganizarArray(data: any[]): any[] {
    const results = [];
    const len: number = data.length;
    for (let i = 0; i < len; i++) {
      results.push(data[i]);
    }
    return results;
  }

  validadorCpfCnpj(sCPFSNPJ: string): string {
    sCPFSNPJ = sCPFSNPJ.replace(/[^a-zA-Z0-9]/g, '');

    if ((sCPFSNPJ.length === 11) || (sCPFSNPJ.length === 14)) {
      const retorno = this.calcularCpfCnpjValido(sCPFSNPJ);
      return retorno;
    } else if (sCPFSNPJ === '') {
      return '';
    } else {
      return 'false';
    }


  }

  calcularCpfCnpjValido(cpfCnpj: string): string {
    //

    let tamanho: any;
    let numeros: any;
    let digitos: any;
    let soma = 0;
    let pos = 0;
    let resto = 0;
    let resultado = 0;

    // Esta função retira os caracteres . / - da string do cnpj, deixando apenas os números
    // const auxCPFCNPJ = sCPFSNPJ.replace('.', '').replace('.', '').replace('/', '').replace('-', '');

    if (cpfCnpj.length === 14) {
      // Testa as sequencias que possuem todos os dígitos iguais e se o cnpj não tem 14 dígitos, retonando falso e exibindo uma msg de erro
      if (cpfCnpj === '00000000000000' || cpfCnpj === '11111111111111' || cpfCnpj === '22222222222222' || cpfCnpj === '33333333333333' ||
        cpfCnpj === '44444444444444' || cpfCnpj === '55555555555555' || cpfCnpj === '66666666666666' || cpfCnpj === '77777777777777' ||
        cpfCnpj === '88888888888888' || cpfCnpj === '99999999999999' || cpfCnpj.length !== 14) {
        return 'false';
      }

      // A variável numeros pega o bloco com os números sem o DV, a variavel
      // digitos pega apenas os dois ultimos numeros (Digito Verificador).
      tamanho = cpfCnpj.length - 2;
      numeros = cpfCnpj.substring(0, tamanho);
      digitos = cpfCnpj.substring(tamanho);
      soma = 0;
      pos = tamanho - 7;


      // Os quatro blocos seguintes de funções irá reaizar a validação do CNPJ propriamente dito,
      // conferindo se o DV bate. Caso alguma das funções não consiga verificar
      // o DV corretamente, mostrará uma mensagem de erro ao usuário e retornará falso,
      // para que o usário posso digitar novamente um número
      for (let i = tamanho; i >= 1; i--) {
        soma += (numeros.charAt(tamanho - i) * pos--);
        if (pos < 2) {
          pos = 9;
        }
      }

      resultado = ((soma % 11) < 2) ? 0 : (11 - (soma % 11));

      if (resultado != digitos.charAt(0)) {
        return 'false';
      }

      tamanho = tamanho + 1;
      numeros = cpfCnpj.substring(0, tamanho);
      soma = 0;
      pos = tamanho - 7;

      for (let k = tamanho; k >= 1; k--) {
        soma += numeros.charAt(tamanho - k) * pos--;
        if (pos < 2) {
          pos = 9;
        }
      }

      resultado = ((soma % 11) < 2) ? 0 : (11 - (soma % 11));

      if (resultado != digitos.charAt(1)) {
        return 'false';
      }
      return 'true';
    }
    else if (cpfCnpj.length === 11) {
      if (cpfCnpj === '00000000000' || cpfCnpj === '11111111111' || cpfCnpj === '22222222222' || cpfCnpj === '33333333333' ||
        cpfCnpj === '44444444444' || cpfCnpj === '55555555555' || cpfCnpj === '66666666666' || cpfCnpj === '77777777777' ||
        cpfCnpj === '88888888888' || cpfCnpj === '99999999999' || cpfCnpj.length !== 11) {
        return 'false';
      }
      // Os seis blocos seguintes de funções vão realizar a validação do CPF propriamente dito,
      // conferindo se o DV bate. Caso alguma das funções não consiga verificar
      // o DV corretamente, mostrará uma mensagem de erro ao usuário e retornará falso,
      // para que o usário posso digitar novamente um número para ser testado

      //Multiplica cada digito por numeros de 1 a 9, soma-os e multiplica-os por 10. Depois,
      // divide o resultado encontrado por 11 para encontrar o resto
      for (let i = 1; i <= 9; i++) {
        soma = soma + parseInt(cpfCnpj.substring(i - 1, i), 10) * (11 - i);
      }

      resto = (soma * 10) % 11;
      if ((resto === 10) || (resto === 11)) {
        resto = 0;
      }

      if (resto !== parseInt(cpfCnpj.substring(9, 10), 10)) {
        return 'false';
      }

      soma = 0;

      for (let k = 1; k <= 10; k++) {
        soma = soma + parseInt(cpfCnpj.substring(k - 1, k), 10) * (12 - k);
      }

      resto = (soma * 10) % 11;

      if ((resto === 10) || (resto === 11)) {
        resto = 0;
      }

      if (resto !== parseInt(cpfCnpj.substring(10, 11), 10)) {
        return 'false';
      }
      return 'true';
    }
    else {
      return 'false';
    }
  }

  incrementarMes(dataDesejada: any, contadorMes: any): any {
    const arrayData = (dataDesejada).split('-');
    const ano = Number(arrayData[0]);
    const mes = (Number(arrayData[1]) - 1) + contadorMes;
    const dia = Number(arrayData[2]);
    const dataIncrementada = new Date(ano, mes, dia).toISOString().slice(0, 10);
    return dataIncrementada;
  }

  getDataAtual(): any {
    const dataAtual = new Date().toLocaleDateString();
    const novaData = dataAtual.split('/');
    const dataFinal = novaData[2] + '-' + novaData[1] + '-' + novaData[0];
    return dataFinal;
  }

  validaDataMenorQueHoje(data: string, dataFinal = ''): any {
    const dataAtual = this.getDataAtual();
    const dataAtualParse = Date.parse(dataAtual);
    const dataParse = Date.parse(data);
    if (dataAtualParse < dataParse) {
      return 2;
    } else if (dataAtualParse === dataParse) {
      return 1;
    } else {
      return 0;
    }
  }

  validaDataInicialMenorQueFinal(dataInicial: string, dataFinal: string): any {
    const dataInicialParse = Date.parse(dataInicial);
    const dataFinalParse = Date.parse(dataFinal);
    if (dataFinalParse < dataInicialParse) {
      return 2;
    } else if (dataInicialParse === dataFinalParse) {
      return 1;
    } else {
      return 0;
    }
  }

  validaHoraMenorQueAgora(data: string, hora: string): any {
    const dataValida = this.validaDataMenorQueHoje(data);
    if (dataValida === 1) {
      const horaAtual = new Date().getTime();
      const horaParse = Date.parse(data + ' ' + hora);
      if (horaAtual <= horaParse) {
        return 1;
      } else {
        return 0;
      }
    } else {
      return dataValida;
    }
  }

  // // ASCII only
  // stringToBytes(s: { length: Iterable<number>; charCodeAt: (arg0: number) => number; }) {
  //   const array = new Uint8Array(s.length);
  //   for (let i = 0, l = s.length; i < l; i++) {
  //     array[i] = s.charCodeAt(i);
  //   }
  //   return array.buffer;
  // }

  // // ASCII only
  // bytesToString(buffer: Iterable<number>) {
  //   return String.fromCharCode.apply(null, new Uint8Array(buffer));
  // }

  /**
 * Faz a validacao de data
 *
 * @param data data para ser validada
 * @param tipo  1 para data inicial e 2 para data final e 3 para comparar a inicial e a final
 * @param dataFinal para nao deixar a data inical > que a final
 */
  validaDataString(data: any, tipo: string, dataFinal = '') {

    //aqui valida se a dataInicial/data é uma data valida se não for retorna a data de hoje 
    if (data == null || data == '') {
      return this.getDataAtual();
    }
    if (data.length > 10) {
      return this.getDataAtual();
    }
    if (this.validarData(data) == false) {
      return this.getDataAtual();
    }


    if (tipo == '1') { //verifiar se uma data unica é valida  
      return data;
    }

    if (tipo == '2') { // verifica se a data final é menor que hoje 
      const a = this.validaDataMenorQueHoje(dataFinal);
    }

    if (tipo == '3') { // verifica se a data inicial é menor que a data final
      const a = this.validaDataInicialMenorQueFinal(data, dataFinal);
      return data;
    }
    return data;
  }

  validarData(data: any, dataAniversario = false): boolean {
    let retorno = true;
    if (data) {
      const arrayData = (data).split('-');
      if (dataAniversario === false) {
        if ((arrayData[0] > '3000') || (arrayData[0] < '2000')) {
          retorno = false;
        }

      } else {
        if (arrayData[0] > '3000') {
          retorno = false;
        }
      }
      if (arrayData[1] > '12') {
        retorno = false;
      }
      if (arrayData[2] > '31') {
        retorno = false;
      }


    }
    return retorno;
  }

}
