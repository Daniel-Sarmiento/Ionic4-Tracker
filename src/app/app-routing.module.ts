import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },  { path: 'recorrido-mapa', loadChildren: './recorrido-mapa/recorrido-mapa.module#RecorridoMapaPageModule' },
  { path: 'mirar-recorrido', loadChildren: './mirar-recorrido/mirar-recorrido.module#MirarRecorridoPageModule' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
