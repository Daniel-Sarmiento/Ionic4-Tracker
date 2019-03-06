import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecorridoMapaPage } from './recorrido-mapa.page';

describe('RecorridoMapaPage', () => {
  let component: RecorridoMapaPage;
  let fixture: ComponentFixture<RecorridoMapaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecorridoMapaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecorridoMapaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
