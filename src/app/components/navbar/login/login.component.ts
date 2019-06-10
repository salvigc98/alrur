import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog,MatDialogRef, MatDialogConfig, MAT_DIALOG_DATA, MatSnackBar} from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { iguales } from '../../shared/must-match-validator/must-match-validator.component';

// Servicios

import { ComprobarViajeroService } from '../../../servicios/comprobar-viajero.service';
import { RegistrarViajeroService } from '../../../servicios/registrar-viajero.service';
import { RecuperarContrasenaService } from '../../../servicios/recuperar-contrasena.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  crear:boolean = false;
  acceder:boolean = true;
  recuperar:boolean = false;
  formInicio: FormGroup;
  formRegistro: FormGroup;
  formRecuperar: FormGroup;
  CorreoInicio:string;
  ContrasenaInicio:string;
  NombreRegistro:string;
  ApellidosRegistro:string;
  ContrasenaRegistro:string;
  ContrasenaRegistro2:string;
  CorreoRegistro:string;
  CorreoRecuperar:string;
  submitted = false;
  submittedRegistro = false;
  submittedRecuperar = false;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    public comprobarViajero: ComprobarViajeroService,
    public registrarViajero: RegistrarViajeroService,
    public RecuperarContrasena: RecuperarContrasenaService,
    private snackBar: MatSnackBar,
    private cookieService: CookieService,
    private dialogRef: MatDialogRef<LoginComponent>,){}

  ngOnInit() {
      this.formInicio = this.fb.group({
        CorreoInicio: [this.CorreoInicio, [Validators.required, Validators.email]],
        ContrasenaInicio: [this.ContrasenaInicio, [Validators.required, Validators.minLength(6)]]
      });

      this.formRegistro = this.fb.group({
        NombreRegistro: [this.NombreRegistro, Validators.required],
        ApellidosRegistro: [this.ApellidosRegistro, Validators.required],
        ContrasenaRegistro: [this.ContrasenaRegistro, [Validators.required, Validators.minLength(6)]],
        ContrasenaRegistro2: [this.ContrasenaRegistro2, [Validators.required, Validators.minLength(6)]],
        CorreoRegistro: [this.CorreoRegistro, [Validators.required, Validators.email]]
      },
      {
        validator: iguales('ContrasenaRegistro', 'ContrasenaRegistro2')
      }
      );

      this.formRecuperar = this.fb.group({
        CorreoRecuperar: [this.CorreoRecuperar, [Validators.required, Validators.email]],
      });
  }

  get f() {
    return this.formInicio.controls;
  }
  get fregistro() {
    return this.formRegistro.controls;
  }

  get frecuperar() {
    return this.formRecuperar.controls;
  }

  onSubmitInicio() {
    this.submitted = true;

    if (this.formInicio.invalid) {
      return;
  }
  
    let CorreoInicio = this.formInicio.value.CorreoInicio;
    let ContrasenaInicio = this.formInicio.value.ContrasenaInicio;
    this.comprobarViajero.comprovarViajero(CorreoInicio, ContrasenaInicio)
    .subscribe(
      (data:any) =>{
        if(data == 'error'){
          this.snackBar.open('Usuario o contraseña incorrectos', '', {
            duration: 3000,
          });
        }else{
          this.cookieService.set('token', data[0]['token']);
          this.dialogRef.close();
          this.snackBar.open('Bienvenido a Alrur', '', {
            duration: 3000,
          });
        }
      },
      error =>{
        if(error){
        this.snackBar.open('Fallo al conectar con el servidor', '', {
          duration: 3000,
        });
      }
      }
    );
  }

  onSubmitRegistro() {
    this.submittedRegistro = true;

    if (this.formRegistro.invalid) {
      return;
  }
    let NombreRegistro = this.formRegistro.value.NombreRegistro;
    let ApellidosRegistro = this.formRegistro.value.ApellidosRegistro;
    let ContrasenaRegistro = this.formRegistro.value.ContrasenaRegistro;
    let CorreoRegistro = this.formRegistro.value.CorreoRegistro;
    this.registrarViajero.registrarViajero(NombreRegistro, ApellidosRegistro, ContrasenaRegistro, CorreoRegistro)
    .subscribe((data:any) =>{
      if(data == 'ya_registrado'){
          this.snackBar.open('Usuario ya existente', '', {
          duration: 3000,
        });
      }
      if(data == 'correo_enviado'){
        this.snackBar.open('Se ha enviado un email a su direeción para poder verificar la cuenta', '', {
          duration: 3000,
        });
        this.dialogRef.close();
      }
      if(data == 'error'){
        this.snackBar.open('Error durante el registro del usuario', '', {
          duration: 3000,
        });
      }
    },
      error =>{
        if(error){
          this.snackBar.open('Fallo al conectar con el servidor', '', {
            duration: 3000,
          });
        }
      });
  }

  onSubmitRecuperar(){
    this.submittedRecuperar = true;

    if (this.formRecuperar.invalid) {
      return;
  }

    let CorreoRecuperar = this.formRecuperar.value.CorreoRecuperar;
    this.RecuperarContrasena.recuperarContrasena(CorreoRecuperar, 'viajero')
    .subscribe((data:any) =>{
      if(data == 'correo_enviado'){
        this.snackBar.open('Se ha enviado un correo con instrucciones para restablecer la contraseña', '', {
          duration: 3000,
        });
        this.dialogRef.close();
      }
      if(data == 'error'){
        this.snackBar.open('No existe ningún usuario con el correo proporcionado', '', {
          duration: 3000,
        });
      }
    },
    error =>{
      if(error){
        this.snackBar.open('Fallo al conectar con el servidor', '', {
          duration: 3000,
        });
      }
    }
    )}

  close() {
      this.dialogRef.close();
  }

  crearCuenta(){
    this.crear = true;
    this.acceder = false;
    this.recuperar = false;
    }

    recuperarCuenta() {
      this.crear = false;
      this.acceder = false;
      this.recuperar = true;
    }

}
