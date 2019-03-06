import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RecorridoMapaPage } from './recorrido-mapa.page';

const routes: Routes = [
  {
    path: '',
    component: RecorridoMapaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RecorridoMapaPage]
})
export class RecorridoMapaPageModule {}
