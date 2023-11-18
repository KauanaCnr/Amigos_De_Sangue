import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FuncoesService } from '../../servicos/funcoes/funcoes.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-cadastro-consulta',
  templateUrl: './cadastro-consulta.page.html',
  styleUrls: ['./cadastro-consulta.page.scss'],
})
export class CadastroConsultaPage implements OnInit {
  public cadastroForm!: FormGroup;
  data!: any;
  hora!: any;
  constructor(
    private formBuilder: FormBuilder,
    public router: Router,
    private funcoes: FuncoesService,
    private dataPipe: DatePipe,



  ) { }

  ngOnInit() {
    this.cadastroForm = this.formBuilder.group({
      codigo: '0',
      usuario: null,
      dataConsulta: null,
      horarioConsulta: null,
      campanhaDoacao: '0',
      tituloDoacao: '',
      tipoSanguineo: '',
      tipoDoacao: '0',
      nomeHemocentro: 'Hemopasso',
      localConsulta: 'Passo Fundo - RS',
      status: '1',

    });
  }

  ionViewWillEnter() {
    this.cadastroForm = this.formBuilder.group({
      codigo: '0',
      usuario: null,
      nomeUsuario: null,
      dataConsulta: null,
      horarioConsulta: null,
      campanhaDoacao: '0',
      tituloDoacao: '',
      tipoSanguineo: '',
      tipoDoacao: '0',
      nomeHemocentro: 'Hemopasso',
      localConsulta: 'Passo Fundo - RS',
      status: '',

    });

    const data1 = new Date().toISOString();
    const hora = new Date().toISOString();
    this.data = this.dataPipe.transform(data1, 'dd/MM/yyyy');
    this.data = this.funcoes.getDataAtual();
    this.hora = this.dataPipe.transform(hora, 'HH:mm');
    this.cadastroForm.controls['dataConsulta'].setValue(this.data);
    this.cadastroForm.controls['horarioConsulta'].setValue(this.hora);

  }

  salvar() {
    // Lógica para cadastrar a consulta/doação no banco de dados
    console.log('Consulta/Doação cadastrada:', this.cadastroForm.value);
    // Você pode chamar um serviço para enviar os dados para o backend aqui
  }

  cancela() {
    this.router.navigate(['lista-doacao-campanha']);
    this.cadastroForm.reset()
  }



}
