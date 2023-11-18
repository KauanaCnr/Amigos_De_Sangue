import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaConsultaPage } from './lista-consulta.page';

const routes: Routes = [
  {
    path: '',
    component: ListaConsultaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaConsultaPageRoutingModule {}
