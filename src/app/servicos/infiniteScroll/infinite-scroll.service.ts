import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InfiniteScrollService {
  arrayComTodosItens: string | any[] = [];
  arrayParaRetorno: any;
  tamanhoTotalArray: any;
  qteValoresPorPagina!: number;
  indexParaPararLaco!: number;
  constructor() {
    this.qteValoresPorPagina = 25;
  }

  limparArrays(): void {
    this.arrayComTodosItens = [];
    this.arrayParaRetorno = [];
    this.tamanhoTotalArray = 0;
    this.indexParaPararLaco = 0;
  }


  carregarMaisInfo(arrayInfoAtual: any): Observable<any> {
    return new Observable(subscriber => {

      this.indexParaPararLaco = 0;
      this.indexParaPararLaco = arrayInfoAtual.length + 2;
      arrayInfoAtual = [];
      let contador = 0;
      while (arrayInfoAtual.length < this.indexParaPararLaco) {
        arrayInfoAtual.push(this.arrayComTodosItens[contador]);
        contador++;
        if (contador >= this.arrayComTodosItens.length) {
          break;
        }
      }
      subscriber.next(arrayInfoAtual);
      subscriber.complete();
    });
  }

  carregaInifiteScroll(arrayDesejado: any): any {
    if (!arrayDesejado) {
      return arrayDesejado;
    }
    return this.preparaInfiniteScroll(arrayDesejado);
  }

  preparaInfiniteScroll(arrayDesejado: string | any[]): any {
    this.arrayComTodosItens = [];
    this.arrayComTodosItens = arrayDesejado;
    this.tamanhoTotalArray = arrayDesejado.length;
    const arrayAjustado = arrayDesejado.slice(0, 15);
    return arrayAjustado;
  }
}
