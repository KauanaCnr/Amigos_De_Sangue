wwimport { File, IWriteOptions } from '@ionic-native/file/ngx';
import { Injectable } from '@angular/core';
import { AlertasService } from '../alertas/alertas.service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ImagemService {

  listaImagens = [];
  listaImagensWeb: any = [];

  listaPdfs: any = [];
  listaPdfsWeb = [];

  constructor(
    private servicoDeAlertasService: AlertasService,
    private file: File,


  ) { }

  pegaArquivoImagemPdf(event: any) {
    let arquivo: any = event.srcElement.files[0];
    let base64: string;

    if (arquivo.type !== 'application/pdf') {
      event.srcElement.files[0];
      const reader = new FileReader();
      // const temp = img.imgBlob.replace('blob:', '')
      reader.readAsDataURL(event.srcElement.files[0]);
      reader.onload = (preImagemBase64: any) => {
        const imagem = new Image();
        imagem.src = preImagemBase64.target.result;
        const dataUrl = <string>preImagemBase64.target.result;
        base64 = dataUrl.split(',')[1];
        const marcaDguaBase64 = base64;

        if (arquivo.type == 'image/png' || arquivo.type == 'image/jpeg') {
          this.listaImagensWeb.push(arquivo);
          this.listaImagensWeb.forEach((element: any) => {
            const image = document.createElement('img');
            image.src = URL.createObjectURL(element);
            element.imgBlob = image.src;
            element.base64 = base64;
            return event;
          });
        } else {
          this.servicoDeAlertasService.presentToast(600, 'Adicione um arquivo de um formato valido', 'danger', 'close-cirle-outline');
        }
      };
    } else {
      const file = new FileReader();

      file.readAsDataURL(event.srcElement.files[0]);
      file.onload = (preImagemBase64: any) => {
        const dataUrl = <string>preImagemBase64.target.result;
        base64 = dataUrl.split(',')[1];
        const obj = {
          nome: arquivo.name,
          pdfbase64: base64,
          pdfArquivo: arquivo
        };
        this.listaPdfs.push({
          nome: obj.nome,
          pdfbase64: obj.pdfbase64,
          pdfArquivo: obj.pdfArquivo,
        });
      };
    }
    return event;
  }


  baixaImagem(img: any, aparelho: string) {
    if (aparelho == 'browser') {
      this.baixarImgNavegador(img);
      // } else if (aparelho == 'nativo') {
      // this.baixarImagemNativo(img)
    } else {
      this.baixarImagemNativo(img).subscribe(() => {
      });
    }
  }

  baixarImagemNativo(img: { nomeArquivo: any; base64: any; }): Observable<any> {
    // this.plat = this.ionicService.currentPlatform
    return new Observable((subscriber) => {
      // const contentFile = this.base64ToBlob(img.base64, 'application/pdf', 512);
      // const novoNomePdf = nomePdf + '.pdf';
      const local = 'file:///storage/emulated/0/Download/';
      try {
        const path = this.file.dataDirectory;
        const options: IWriteOptions = { replace: true };
        // this.file.dataDirectory;
        this.file.writeFile(path, img.nomeArquivo, img.base64, options).then((res: any) => {
          // this.storageimage(name)
        });
      } catch (error) {
        console.error('error');
        console.error(error);
      }
    });
  }

  private baixarImgNavegador(img: { base64: string; nomeArquivo: string; }): string {
    try {
      const downloadLink = document.createElement('a');
      downloadLink.href = img.base64;
      downloadLink.download = img.nomeArquivo;
      downloadLink.click();
      return '';
    } catch (error: any) {
      return error;
    }
  }
}