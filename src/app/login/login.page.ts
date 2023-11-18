import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { AlertasService } from '../servicos/alertas/alertas.service';
import { ConfigService } from '../servicos/config/config.service';
import { LoginService } from '../servicos/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;
  alteraForm!: FormGroup;
  nomeLoja: string = '';
  mostraTela = 'login';
  logo = '';

  validacao = 'danger';
  mostraSenha = 'password';
  mostraConfirmaSenha = 'password';
  mostraAltera = false;
  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private modalControler: ModalController,
    private configService: ConfigService,
    private servicoDeAlertasService: AlertasService

  ) { }

  ngOnInit() {
  }

  fechar() {
    this.modalControler.dismiss()
  }

  logar() {

  }

  cadastrar() {

  }

  esqueciMinhaSenha() {

  }

  login() {

  }

  gotoNextField(nextElement: any): void {
    nextElement.setFocus();
  }

  salvarCadastro() {

  }

  validaEmail() {

  }

  alterarLogin() {

  }

  salvarAlteracao() {

  }

  visualizaSenha() {

  }

  validaConfirmacaoSenha() {

  }

  visualizaSenhaConfirmacao() {

  }
}
