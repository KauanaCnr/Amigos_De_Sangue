import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CadastroConsultaPageRoutingModule } from './cadastro-consulta-routing.module';

import { CadastroConsultaPage } from './cadastro-consulta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    CadastroConsultaPageRoutingModule
  ],
  declarations: [CadastroConsultaPage]
})
export class CadastroConsultaPageModule { }
