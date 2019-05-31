import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { VistaPropietariosComponent } from './components/vista-propietarios/vista-propietarios.component';
import { AnadirAlojamientoComponent } from './components/anadir-alojamiento/anadir-alojamiento.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'vistaPropietarios', component: VistaPropietariosComponent },
  { path: 'anadirAlojamiento', component: AnadirAlojamientoComponent },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
