import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from "@angular/common/http";
import { CookieService } from 'ngx-cookie-service';

// componentes

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/navbar/login/login.component';
import { LoginPropietarioComponent } from './components/navbar/login-propietario/login-propietario.component';
// import { MustMatchValidatorComponent } from './components/shared/must-match-validator/must-match-validator.component';
import { VistaPropietariosComponent } from './components/vista-propietarios/vista-propietarios.component';
import { AnadirAlojamientoComponent } from './components/anadir-alojamiento/anadir-alojamiento.component';
import { AlquilarCasaruralComponent } from './components/alquilar-casarural/alquilar-casarural.component';
import { RecuperarContrasenaComponent } from './components/recuperar-contrasena/recuperar-contrasena.component';
// import { RegistroComponent } from './components/navbar/registro/registro.component';

// // import { Dialogo } from './components/navbar/navbar.component'

// Servicios

// import { ComprobarViajeroService } from './servicios/comprobar-viajero.service';

// Angular material componentes

import {MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material';
import {MatSelectModule} from '@angular/material/select';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatCardModule} from '@angular/material/card';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MAT_DATE_LOCALE } from '@angular/material';
import {MatSliderModule} from '@angular/material/slider';


// For MDB Angular Free
import {  CarouselModule, ButtonsModule, WavesModule, IconsModule } from 'angular-bootstrap-md';
// MDB Angular Free
// import { ButtonsModule, WavesModule, IconsModule } from 'angular-bootstrap-md'


import { AngularEditorModule } from '@kolkov/angular-editor';

// import es from '@angular/common/locales/es';




@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    // Dialogo,
    LoginComponent,
    // RegistroComponent,
    HomeComponent,
    // MustMatchValidatorComponent,
    LoginPropietarioComponent,
    VistaPropietariosComponent,
    AnadirAlojamientoComponent,
    AlquilarCasaruralComponent,
    RecuperarContrasenaComponent,

  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    MatToolbarModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatDialogModule,
    MatSliderModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    HttpClientModule,
    MatCardModule,
    MatIconModule,
    MatSlideToggleModule,
    AngularEditorModule,
    CarouselModule,

  ],
  providers: [
    CookieService,
    {provide: MAT_DATE_LOCALE, useValue: 'es'},
    // ComprobarViajeroService,
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    LoginComponent,
    LoginPropietarioComponent
    // RegistroComponent
  ]
})
export class AppModule { }
