import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Network } from "@ionic-native/network/ngx";
import { LoadingController, AlertController, ToastController } from "@ionic/angular";
import { Observable, throwError } from "rxjs";
import { catchError, map, tap, delay, retryWhen } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpConfigInterceptorService implements HttpInterceptor {
  loaderToShow: any;
  statusLoader!: boolean;

  constructor(
    public loadingController: LoadingController,
    private alertController: AlertController,
    private toastController: ToastController,
    private network: Network) { }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!request.headers.has('Content-Type')) {

      request = request.clone({ setHeaders: { 'content-type': 'application/json' } });
    }

    request = request.clone({ headers: request.headers.set('Accept', 'application/json') });

    // this.showLoader();

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof Response) {
          console.log('evento--->', event);
        }


        // this.hideLoaderComTempo(5000);

        return event;
      }),

      retryWhen(err => {
        const retries = 1;
        return err.pipe(delay(3000), tap(() => {
          this.showRetryToast(retries);
        }),
          map(error => {
            // if (retries++ == CONFIG_REQUISICAO.qtdaRequisicoesErro) {
            throw error;
            // }
            return error;
          })
        );
      }),

      catchError((error: HttpErrorResponse) => {
        this.loadingController.dismiss();
        if (error.status === 404) {
          alert('erro de conexão com a api');
        }
        if (error.status === 0) {
          if (error.error.success === false) {
            // //console.log('backend retornou erro');
          } else {
            // //console.log('erro de conexao com a api');
          }
        }
        return throwError(error);
      }));
  }

  /**
   * show message da tela
   *
   * @param cabecalho  titulo
   * @param subtitulo  subtitulo
   * @param mensagem   mensagem
   */
  async showMessage(cabecalho: any, subtitulo: any, mensagem: any) {
    const alert = await this.alertController.create({
      header: cabecalho,
      subHeader: subtitulo,
      message: mensagem,
      buttons: [
        {
          text: 'OK',
          handler: (alertData) => {

          },
        },
      ],
      backdropDismiss: true,
    });
    await alert.present().then(() => {
      // direciona o foco para os botões dentro do alert, para não ocorrer problema de enviar a requisição várias vezes
      const firstInput: any = document.querySelector('ion-alert button');
      firstInput.focus();
      return;
    });
  }

  /**
   * toast  de tentativa de conexão
   *
   * @param retryCount  quantidade de vezes que vai aparecer no toast
   */
  async showRetryToast(retryCount: number) {
    const toast = await this.toastController.create({
      message: `Tentativa: ${retryCount}/3`,
      duration: 2000
    });
    toast.present();
  }
  /**
   * verifica o lado do erro
   */
  verifyErrorSide() {
    this.network.onDisconnect().subscribe(() => {
      // this.showToast('sem conexão com a internet');
      // //console.log('sem conexao local')
    });
    this.network.onConnect().subscribe(() => {
      setTimeout(() => {
        // //console.log('com internet');
      }, 2000);
    });
  }

  showLoader() {
    this.loaderToShow = this.loadingController.create({
      spinner: 'crescent',
      message: 'Aguarde...'
    }).then((res) => {
      res.present();
      res.onDidDismiss().then((dis) => {
        this.loadingController.dismiss();
        // this.hideLoader(10);
        //  //console.log('Loading dismissed!');
      });
    });
    // this.hideLoader(3500);
  }
  hideLoaderComTempo(tempoParaDismis: number) {
    this.loadingController.dismiss();
    setTimeout(() => {
      this.loadingController.dismiss();
    }, tempoParaDismis);
  }
  hideLoader() {
    this.loadingController.dismiss();
  }


}


