import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { VistaPropietariosComponent } from './components/vista-propietarios/vista-propietarios.component';
import { AnadirAlojamientoComponent } from './components/anadir-alojamiento/anadir-alojamiento.component';
import { AlquilarCasaruralComponent } from './components/alquilar-casarural/alquilar-casarural.component';
import { RecuperarContrasenaComponent } from './components/recuperar-contrasena/recuperar-contrasena.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'vistaPropietarios', component: VistaPropietariosComponent },
  { path: 'anadirAlojamiento', component: AnadirAlojamientoComponent },
  { path: 'alquilarCasarural/:id_casarural', component: AlquilarCasaruralComponent },
  { path: 'RecuperarContrasena/:token/:accion', component: RecuperarContrasenaComponent },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
