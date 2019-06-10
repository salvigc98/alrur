import { Component, OnInit,  Inject } from '@angular/core';
import { MatDialog,MatDialogRef, MatDialogConfig, MAT_DIALOG_DATA, MatSnackBar} from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { iguales } from '../../shared/must-match-validator/must-match-validator.component';

import { ComprobarPropietarioService } from '../../../servicios/comprobar-propietario.service';
import { RegistrarPropietarioService } from '../../../servicios/registrar-propietario.service';
import { RecuperarContrasenaService } from '../../../servicios/recuperar-contrasena.service';

@Component({
  selector: 'app-login-propietario',
  templateUrl: './login-propietario.component.html',
  styleUrls: ['./login-propietario.component.css']
})
export class LoginPropietarioComponent implements OnInit {
  crear:boolean = false;
  acceder:boolean = true;
  recuperar:boolean = false;
  formInicio: FormGroup;
  formRegistro: FormGroup;
  formRecuperar: FormGroup;
  CorreoInicio:string;
  ContrasenaInicio:string;
  NombreRegistro:string;
  NifRegistro:string;
  DireccionRegistro:string;
  // CodigoPostalRegistro:string;
  TelefonoRegistro:string;
  ContrasenaRegistro:string;
  ContrasenaRegistro2:string;
  CorreoRegistro:string;
  CorreoRecuperar:string;
  submitted = false;
  submittedRegistro = false;
  submittedRecuperar = false;
  // comprobarFormulario: boolean;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    public ComprobarPropietario: ComprobarPropietarioService,
    public registrarPropietario: RegistrarPropietarioService,
    public recuperarContrasena: RecuperarContrasenaService,
    private snackBar: MatSnackBar,
    private cookieService: CookieService,
    private router:Router,
    private dialogRef: MatDialogRef<LoginPropietarioComponent>,){}
  //     @Inject(MAT_DIALOG_DATA) data) {
  //   this.CorreoInicio = data.CorreoInicio;
  //   this.ContrasenaInicio = data.ContrasenaInicio;
  //  }

  // ngOnInit() {
  // }

  ngOnInit() {
      this.formInicio = this.fb.group({
          CorreoInicio: [this.CorreoInicio, [Validators.required, Validators.email]],
          ContrasenaInicio: [this.ContrasenaInicio, [Validators.required, Validators.minLength(6)]]
      });

      this.formRegistro = this.fb.group({
        NombreRegistro: [this.NombreRegistro, Validators.required],
        NifRegistro: [this.NifRegistro, Validators.required],
        ContrasenaRegistro: [this.ContrasenaRegistro, [Validators.required, Validators.minLength(6)]],
        ContrasenaRegistro2: [this.ContrasenaRegistro2, [Validators.required]],
        DireccionRegistro: [this.DireccionRegistro, Validators.required],
        // CodigoPostalRegistro: [this.CodigoPostalRegistro, Validators.required],
        TelefonoRegistro: [this.TelefonoRegistro, Validators.required],
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
    // this.dialogRef.close(this.formInicio.value);
    // Datos de inicio de sesión
    let CorreoInicio = this.formInicio.value.CorreoInicio;
    let ContrasenaInicio = this.formInicio.value.ContrasenaInicio;
    this.ComprobarPropietario.comprobarPropietario(CorreoInicio, ContrasenaInicio)
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
          // this.cookieService.set('usuario', data[0]['nombre']);
          // console.log(this.cookieService.get('usuario'));
          // this.usuario = data[0]['nombre'];
          // console.log(this.usuario);
          this.dialogRef.close();
          this.router.navigate(['/', 'vistaPropietarios']);
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
        console.log(error);
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
    let NifRegistro = this.formRegistro.value.NifRegistro;
    let ContrasenaRegistro = this.formRegistro.value.ContrasenaRegistro;
    let DireccionRegistro = this.formRegistro.value.DireccionRegistro;
    // let CodigoPostalRegistro = this.formRegistro.value.CodigoPostalRegistro;
    let TelefonoRegistro = this.formRegistro.value.TelefonoRegistro;
    let CorreoRegistro = this.formRegistro.value.CorreoRegistro;
    this.registrarPropietario.registrarPropietario(NombreRegistro, NifRegistro, ContrasenaRegistro, DireccionRegistro, TelefonoRegistro, CorreoRegistro)
    .subscribe((data:any) =>{
      if(data == 'ya_registrado'){
          this.snackBar.open('Usuario ya existente', '', {
          duration: 3000,
        });
      }
      if(data == 'correo_enviado'){
        this.snackBar.open('Se ha enviado un email a su dirección para poder verificar la cuenta', '', {
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
          console.log(error);
        }
      });
  }

  onSubmitRecuperar(){
    this.submittedRecuperar = true;

    if (this.formRecuperar.invalid) {
      return;
  }
    let CorreoRecuperar = this.formRecuperar.value.CorreoRecuperar;
    this.recuperarContrasena.recuperarContrasena(CorreoRecuperar, 'propietario')
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
        console.log(error);
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
