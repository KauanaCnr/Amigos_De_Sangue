import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CadastroConsultaPage } from './cadastro-consulta.page';

describe('CadastroConsultaPage', () => {
  let component: CadastroConsultaPage;
  let fixture: ComponentFixture<CadastroConsultaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CadastroConsultaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
