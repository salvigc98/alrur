import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar} from '@angular/material';
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

  constructor(public dialog: MatDialog, public comprobarViajero: ComprobarViajeroService, private snackBar: MatSnackBar) { }

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
      data =>{
        console.log(data);
        if(data == 'exito'){
        }else{
            this.snackBar.open('Usuario o contraseña incorrectos', '', {
              duration: 3000,
            });
        }
      },
      error =>{
        if(error){
        // this.snackBar.open('Fallo al conectar con el servidor', '', {
        //   duration: 3000,
        // });
        console.log(error);
      }
      }
    );
    }
  }
  );
}

  ngOnInit() {
  }

}



