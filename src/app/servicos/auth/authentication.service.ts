
/* eslint-disable @typescript-eslint/consistent-type-imports */

import { Injectable } from '@angular/core';
// import { ToastController, LoadingController } from '@ionic/angular';
import { ToastController, Platform } from '@ionic/angular';
import { BehaviorSubject, of, Observable } from 'rxjs';







// import { Storage } from '@ionic/storage';




// const httpOptions = {
//   headers: new HttpHeaders({ 'Content-': 'application/json' }),
// };

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {

  private isLoggedIn = false;
  constructor(

    public toastController: ToastController
  ) {
    // this.platform.ready().then(() => {
    //   this.verificarStatusLogin();
    // });
  }

  // verificarStatusLogin(): void {
  //   this.storage.get('LOGIN_INFO').then((response) => {
  //     if (response) {
  //       this.authState.next(true);
  //     }
  //   });
  // }


  // consulta o login nas no servidor


}
