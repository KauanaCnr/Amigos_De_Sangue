import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CadastroConsultaPage } from './cadastro-consulta.page';

const routes: Routes = [
  {
    path: '',
    component: CadastroConsultaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CadastroConsultaPageRoutingModule {}
