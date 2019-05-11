import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from "@angular/common/http";

// componentes

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/navbar/login/login.component';
// import { RegistroComponent } from './components/navbar/registro/registro.component';

// // import { Dialogo } from './components/navbar/navbar.component'

// Servicios

import { ComprobarViajeroService } from './servicios/comprobar-viajero.service';

// Angular material componentes

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSelectModule} from '@angular/material/select';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    // Dialogo,
    LoginComponent,
    // RegistroComponent,
    HomeComponent
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
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    ComprobarViajeroService,
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    LoginComponent,
    // RegistroComponent
  ]
})
export class AppModule { }
