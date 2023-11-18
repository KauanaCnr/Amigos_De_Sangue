import { Injectable } from '@angular/core';
import { LoadingController, AlertController, ToastController, ActionSheetController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertasService {

  constructor(
    public loadingController: LoadingController,
    private alertController: AlertController,
    private toastController: ToastController,
    private actionSheetCtrl: ActionSheetController
  ) { }

  /**
   * apresenta mensagem do loader
   *
   * @param msg mensagem do loader
   */
  async apresentaLoading(msg: string): Promise<any> {
    const loading = this.loadingController.create({
      spinner: 'crescent',
      message: msg,
    });
    await (await loading).present();
    return loading;
  }
  /**
   * finaliza o loader
   *
   * @param loading promisse do loader
   */
  finalizaLoading(loading: any): void {
    loading.then((load: { dismiss: () => void; }) => {
      load.dismiss();
    });
  }
  /**
   * finaliza o loader a força
   */
  finalizaLoadingEmergencial(): void {
    this.checkAndCloseLoader();
    setTimeout(() => this.checkAndCloseLoader(), 1000);
  }

  async checkAndCloseLoader() {
    // Use getTop function to find the loader and dismiss only if loader is present.
    const loader = await this.loadingController.getTop();
    // if loader present then dismiss
    if (loader !== undefined) {
      await this.loadingController.dismiss();
    }
  }

  /**
   * apresenta toast na tela
   *
   * @example icone sucesso: checkmark-circle-outline
   * @example icone erro: close-circle-outline
   * @param duracao duração do toast
   * @param mensagem mensagem que aparece no toast
   * @param color cor que o toast é mostrado
   * @param icone icone que mostra no inicio do toast
   *
   */
  async presentToast(duracao: number, mensagem: string, color = '', icone = ''): Promise<void> {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: duracao,
      color,
      icon: icone,
      // header:'●‿●',
      mode: 'ios',
      cssClass: 'centralizaToast'
    });
    toast.present();
    /**
     * @
     */
  }

  /**
   * menagem de ok com titulo subtitulo e corpo
   *
   * @param sHeader cabeçalho da mensagem
   * @param sSubHeader subtitulo da mensagem
   * @param sMessage corpo da mensagem
   */
  async mensagemDeOk(sHeader: string, sSubHeader: string, sMessage: string): Promise<void> {
    const alert = await this.alertController.create({
      // cssClass: 'my-custom-class',
      header: sHeader,
      subHeader: sSubHeader,
      message: sMessage,
      backdropDismiss: false,
      buttons: ['OK']
    });
    await alert.present().then(() => {
      // direciona o foco para os botões dentro do alert, para não ocorrer problema de enviar a requisição várias vezes
      const firstInput: any = document.querySelector('ion-alert button');
      firstInput.focus();
      return;
    });
  }

  /**
   * Mensagem simples
   *
   * @param msg  corpo da mensagem
   */
  async showMessage(msg: string): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Atenção',
      message: msg,
      buttons: [
        {
          text: 'OK',
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
   * mensagem de ok com titulo subtitulo e corpo
   * utilizada no envio de nota
   *
   * @param sHeader cabeçalho da mensagem
   * @param sSubHeader subtitulo da mensagem
   * @param sMessage corpo da mensagem
   */
  async mensagemOkEnvioDeNota(sHeader: string, sSubHeader: string, sMessage: string): Promise<void> {
    const alert = await this.alertController.create({
      // cssClass: 'my-custom-class',
      header: sHeader,
      subHeader: sSubHeader,
      message: sMessage,
      buttons: ['OK'],
      backdropDismiss: true,
    });
    await alert.present().then(() => {
      // direciona o foco para os botões dentro do alert, para não ocorrer problema de enviar a requisição várias vezes
      const firstInput: any = document.querySelector('ion-alert button');
      firstInput.focus();
      return;
    });
  }

  async mensagemInput(sHeader: string, subheader: string, mensage: string): Promise<any> {
    const alert = await this.alertController.create({
      header: sHeader,
      subHeader: subheader,
      message: mensage,
      inputs: [
        {
          name: 'valor',
          type: 'text'
        }],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            // //console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (alertData) => {
            // //console.log(alertData.valor);
          }
        }
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


  async mensagemInputCadastroPedido(sHeader: string, subheader: string, mensage: string): Promise<number> {
    let resolveFunction: (confirm: number) => void;
    const promise = new Promise<number>(resolve => {
      resolveFunction = resolve;
    });
    const alert = await this.alertController.create({
      header: sHeader,
      subHeader: subheader,
      message: mensage,
      backdropDismiss: false,
      inputs: [
        {
          name: 'valor',
          type: 'number'
        }],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => resolveFunction(0)
        }, {
          text: 'Ok',
          handler: (alertData) => {
            if (alertData.valor < 0.01) {
              resolveFunction(0);
              this.presentToast(2000, 'Não é permitido adicionar produto com o valor negativo ou zerado', 'danger', 'close-circle-outline');
            } else {
              resolveFunction(alertData.valor);
            }
          }
        }
      ]
    });
    await alert.present();
    return promise;
  }
  /**
   *
   * @param header Cabeçalho
   * @param message Mensagem
   * @param ok Mensagem para botão de OK
   * @param notOk Mensagem para botão de Cancelar
   * @returns
   */
  geradorDeAlerta(header: string, message: string, ok: string, notOk: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      // alertController.create(...) returns a promise!
      this.alertController.create({
        header,
        message,
        buttons: [
          {
            text: notOk,
            handler: () => reject(false)
          },
          {
            text: ok,
            handler: () => resolve(true)
          }
        ]
      }).then(alert => {
        // Now we just need to present the alert
        alert.present();
      });
    });
  }

  async mensagemInputObsInterna(sHeader: string, subheader: string, mensage: string): Promise<any> {
    let resolveFunction: (confirm: any) => void;
    const promise = new Promise<any>(resolve => {
      resolveFunction = resolve;
    });
    const alert = await this.alertController.create({
      header: sHeader,
      subHeader: subheader,
      message: mensage,
      backdropDismiss: false,
      inputs: [
        {
          name: 'valor',
          type: 'text'
        }],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => resolveFunction(0)
        }, {
          text: 'Ok',
          handler: (alertData) => {
            resolveFunction(alertData.valor);
          }
        }
      ]
    });
    await alert.present();
    return promise;
  }



  async GeraTroco(sHeader: string, subheader: string, mensage: string): Promise<Number> {
    let resolveFunction: (confirm: number) => void;
    let erro: (confirm: Error) => void;
    const promise = new Promise<number>(resolve => {
      resolveFunction = resolve;

    });
    const alert = await this.alertController.create({
      header: sHeader,
      subHeader: subheader,
      message: mensage,
      backdropDismiss: false,
      animated: true,
      inputs: [
        {
          name: 'valor',
          type: 'number'
        }],
      buttons: [
        {
          text: 'Nao Gerar Troco',
          // role: 'cancel',
          cssClass: 'secondary',
          handler: () => resolveFunction(-99)
        }, {
          text: 'Ok',
          handler: (alertData) => {
            if (alertData.valor < 0.01) {
              // resolveFunction(0);
              erro(alertData);
              this.presentToast(2000, 'Não é permitido adicionar uma entrada sem dinheiro em especie');
              // return Promise.reject('Erro 1');
            } else {
              resolveFunction(alertData.valor);
            }
          }
        }
      ]
    });
    await alert.present();
    return promise;
  }

  async opcoesBancoImagens(): Promise<any> {
    const actionSheet = await this.actionSheetCtrl.create({
      // header: 'Opcoes',
      backdropDismiss: false,
      buttons: [
        {
          text: 'Editar',
          data: { action: 'editar' },
          icon: 'settings-outline',
          cssClass: 'editar'

        },
        {
          text: 'Excluir',
          role: 'destructive',
          data: { action: 'excluir' },
          icon: 'close-circle-outline',
          cssClass: 'excluir'
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          data: { action: 'cancelar' },
          cssClass: 'cancelar'
        },
      ],
      cssClass: 'caixaOpcoesBancoImagens'
    });
    await actionSheet.present();
    return actionSheet.onDidDismiss().then((retorno) => { return Promise.resolve(retorno.data.action) });
  }

  async alertaConfirmarCancelar(header: string, message: string): Promise<any> {
    let retorno = true
    const alert = await this.alertController.create({
      header,
      message,
      backdropDismiss: false,
      buttons: [
        {
          cssClass: 'cancelar',
          text: 'Cancelar',
          handler: () => { retorno = false }
        },
        {
          cssClass: 'confirmar',
          text: 'Confirmar',
          handler: () => { retorno = true }
        }
      ],
      cssClass: 'alertConfirmarCancelar'
    });
    await alert.present();
    return alert.onDidDismiss().then((res) => { return Promise.resolve(retorno) });
  }

  async precisaTroco(): Promise<string> {
    let resolveFunction: (confirm: string) => void;
    const promise = new Promise<string>((resolve) => {
      resolveFunction = resolve;
    });
    const alert = await this.alertController.create({
      header: 'Forma de Pagamento Dinheiro',
      subHeader: 'Precisa de troco para qual Valor?',
      message: 'Digite o valor no campo a baixo',
      backdropDismiss: false,
      inputs: [
        {
          name: 'valor',
          type: 'number',
          label: 'troco',
          // placeholder: '0.00',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: () => resolveFunction('Cancelar'),
        },
        {
          text: 'Ok',
          handler: (res) => resolveFunction(res.valor),
        },
      ],
    });
    await alert.present();
    return promise;
  }
}
