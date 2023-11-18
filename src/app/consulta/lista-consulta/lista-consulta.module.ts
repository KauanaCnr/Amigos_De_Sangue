import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaConsultaPageRoutingModule } from './lista-consulta-routing.module';

import { ListaConsultaPage } from './lista-consulta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaConsultaPageRoutingModule
  ],
  declarations: [ListaConsultaPage]
})
export class ListaConsultaPageModule {}
