import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog,MatDialogRef, MatDialogConfig, MAT_DIALOG_DATA} from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
import { RegistroComponent } from '../registro/registro.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  crear:boolean = false;
  acceder:boolean = true;
  form: FormGroup;
  usuario:string;
  contraseña:string;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
      private dialogRef: MatDialogRef<LoginComponent>,
      @Inject(MAT_DIALOG_DATA) data) {
    this.usuario = data.usuario;
    this.contraseña = data.contraseña;
   }

  // ngOnInit() {
  // }

  ngOnInit() {
      this.form = this.fb.group({
          usuario: [this.usuario, []],
          contraseña: [this.contraseña, []]
      });
  }

  save() {
      this.dialogRef.close(this.form.value);
  }

  close() {
      this.dialogRef.close();
  }

  crearCuenta(){
  this.crear = true;
  this.acceder = false;
  }

}
