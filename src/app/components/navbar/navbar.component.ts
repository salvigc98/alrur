import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar} from '@angular/material';
import { LoginComponent } from '../navbar/login/login.component';
import { LoginPropietarioComponent } from '../navbar/login-propietario/login-propietario.component';

// Servicios

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  // selected = 'option2';
  // usuario:string;
  // login:boolean = false;

  constructor(
    public dialog: MatDialog,
    ) { }

  openDialogViajero() {

    const dialogConfig = new MatDialogConfig();

    // dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.width = '350px';
    dialogConfig.height = '500px';

    dialogConfig.data = {
  };


  const dialogRef = this.dialog.open(LoginComponent, dialogConfig);


}

openDialogPropietario() {

  const dialogConfig = new MatDialogConfig();

  // dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;

  dialogConfig.width = '350px';
  dialogConfig.height = '500px';

  dialogConfig.data = {
};


const dialogRef = this.dialog.open(LoginPropietarioComponent, dialogConfig);


}

  ngOnInit() {
  //  if(this.cookieService.get('usuario')){
  //    this.usuario = this.cookieService.get('usuario');
  //    this.login = true;
  //  }
  }

}



