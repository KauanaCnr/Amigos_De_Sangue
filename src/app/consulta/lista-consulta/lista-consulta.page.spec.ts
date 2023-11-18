import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaConsultaPage } from './lista-consulta.page';

describe('ListaConsultaPage', () => {
  let component: ListaConsultaPage;
  let fixture: ComponentFixture<ListaConsultaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ListaConsultaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
