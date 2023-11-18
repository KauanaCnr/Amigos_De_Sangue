import { Injectable } from '@angular/core';
import { AlertasService } from '../alertas/alertas.service';
import { Platform } from '@ionic/angular';

const doc = 'hello world!';

type Plataforma = 'browser' | 'native' | 'mobileweb' | '';

@Injectable({
  providedIn: 'root'
})
export class IonicService {
  public eMobile!: boolean;

  public plataforma!: Plataforma;
  versao;
  constructor(
    public platform: Platform,
    private servicoDeAlertasService: AlertasService,
  ) {
    this.versao = '17.11.2023';
  }
  get currentPlatform(): any {
    return this.plataforma;
  }

  isNative(): any {
    return this.plataforma === 'native';
  }

  isBrowser(): any {
    return this.plataforma === 'browser';
  }

  isMobileWeb(): any {
    return this.plataforma === 'mobileweb';
  }

  verificaPlataforma(): void {
    // this.mostrarPlatform();
    if (this.platform.is('mobileweb')) {
      this.plataforma = 'mobileweb';
    } else if (this.platform.is('android')) {
      this.plataforma = 'native';
    } else {
      this.plataforma = 'browser';
    }
  }

  mostrarPlatform() {
    const loading = this.servicoDeAlertasService.mensagemDeOk(
      'Plataforma',
      '',
      'Plataforma: ' + this.platform.platforms(),
    );
    this.servicoDeAlertasService.finalizaLoading(loading);
  }
}

