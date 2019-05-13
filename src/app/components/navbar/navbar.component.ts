import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar} from '@angular/material';
import { CookieService } from 'ngx-cookie-service';
import { LoginComponent } from '../navbar/login/login.component';

// Servicios

import { ComprobarViajeroService } from '../../servicios/comprobar-viajero.service';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  // selected = 'option2';
  usuario:string;
  login:boolean = false;

  constructor(
    public dialog: MatDialog,
    public comprobarViajero: ComprobarViajeroService,
    private snackBar: MatSnackBar,
    private cookieService: CookieService
    ) { }

  openDialog() {

    const dialogConfig = new MatDialogConfig();

    // dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.width = '350px';
    dialogConfig.height = '400px';

    dialogConfig.data = {
  };


  const dialogRef = this.dialog.open(LoginComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data =>{
    if(data){
    let correo = data.correo;
    let contrasena = data.contrasena;
    this.comprobarViajero.comprovarViajero(correo, contrasena)
    .subscribe(
      (data:any) =>{
        // console.log(data[0]['token']);
        if(data == 'error'){
          this.snackBar.open('Usuario o contraseña incorrectos', '', {
            duration: 3000,
          });
        }else{
          this.cookieService.set('token', data[0]['token']);
          console.log(this.cookieService.get('token'));
          this.cookieService.set('usuario', data[0]['nombre']);
          console.log(this.cookieService.get('usuario'));
          // this.usuario = data[0]['nombre'];
          // console.log(this.usuario);
        }
      },
      error =>{
        if(error){
        this.snackBar.open('Fallo al conectar con el servidor', '', {
          duration: 3000,
        });
        console.log(error);
      }
      }
    );
    }
  }
  );
}

  ngOnInit() {
   if(this.cookieService.get('usuario')){
     this.usuario = this.cookieService.get('usuario');
     this.login = true;
   }
  }

}



