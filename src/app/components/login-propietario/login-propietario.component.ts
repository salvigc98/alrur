import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MatSnackBar} from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { iguales } from '../shared/must-match-validator/must-match-validator.component';

import { ComprobarUsuariosService } from '../../servicios/comprobar-usuarios.service';
import { RegistrarPropietarioService } from '../../servicios/registrar-propietario.service';
import { RecuperarContrasenaService } from '../../servicios/recuperar-contrasena.service';

@Component({
  selector: 'app-login-propietario',
  templateUrl: './login-propietario.component.html',
  styleUrls: ['./login-propietario.component.css']
})
export class LoginPropietarioComponent implements OnInit {
  crear = false;
  acceder = true;
  recuperar = false;
  formInicio: FormGroup;
  formRegistro: FormGroup;
  formRecuperar: FormGroup;
  CorreoInicio: string;
  ContrasenaInicio: string;
  NombreRegistro: string;
  NifRegistro: string;
  DireccionRegistro: string;
  TelefonoRegistro: string;
  ContrasenaRegistro: string;
  ContrasenaRegistro2: string;
  CorreoRegistro: string;
  CorreoRecuperar: string;
  submitted = false;
  submittedRegistro = false;
  submittedRecuperar = false;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    public ComprobarPropietario: ComprobarUsuariosService,
    public registrarPropietario: RegistrarPropietarioService,
    public recuperarContrasena: RecuperarContrasenaService,
    private snackBar: MatSnackBar,
    private cookieService: CookieService,
    private router: Router,
    private dialogRef: MatDialogRef<LoginPropietarioComponent>, ) {}

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

    const CorreoInicio = this.formInicio.value.CorreoInicio;
    const ContrasenaInicio = this.formInicio.value.ContrasenaInicio;
    this.ComprobarPropietario.comprobarPropietario(CorreoInicio, ContrasenaInicio, 'propietario')
    .subscribe(
      (data: any) => {
        if (data === 'error') {
          this.snackBar.open('Usuario o contraseña incorrectos', '', {
            duration: 3000,
          });
        } else {
          this.cookieService.set('token', data[0]['token']);
          this.dialogRef.close();
          this.router.navigate(['/', 'vistaPropietarios']);
          this.snackBar.open('Bienvenido a Alrur', '', {
            duration: 3000,
          });
        }
      },
      error => {
        if (error) {
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
    const NombreRegistro = this.formRegistro.value.NombreRegistro;
    const NifRegistro = this.formRegistro.value.NifRegistro;
    const ContrasenaRegistro = this.formRegistro.value.ContrasenaRegistro;
    const DireccionRegistro = this.formRegistro.value.DireccionRegistro;
    const TelefonoRegistro = this.formRegistro.value.TelefonoRegistro;
    const CorreoRegistro = this.formRegistro.value.CorreoRegistro;
// tslint:disable-next-line: max-line-length
    this.registrarPropietario.registrarPropietario(NombreRegistro, NifRegistro, ContrasenaRegistro, DireccionRegistro, TelefonoRegistro, CorreoRegistro)
    .subscribe((data: any) => {
      if (data === 'ya_registrado') {
          this.snackBar.open('Usuario ya existente', '', {
          duration: 3000,
        });
      }
      if (data === 'correo_enviado') {
        this.snackBar.open('Se ha enviado un email a su dirección para poder verificar la cuenta', '', {
          duration: 3000,
        });
        this.dialogRef.close();
      }
      if (data === 'error') {
        this.snackBar.open('Error durante el registro del usuario', '', {
          duration: 3000,
        });
      }
    },
      error => {
        if (error) {
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
    const CorreoRecuperar = this.formRecuperar.value.CorreoRecuperar;
    this.recuperarContrasena.recuperarContrasena(CorreoRecuperar, 'propietario')
    .subscribe((data: any) => {
      if (data === 'correo_enviado') {
        this.snackBar.open('Se ha enviado un correo con instrucciones para restablecer la contraseña', '', {
          duration: 3000,
        });
        this.dialogRef.close();
      }
      if (data === 'error') {
        this.snackBar.open('No existe ningún usuario con el correo proporcionado', '', {
          duration: 3000,
        });
      }
    },
    error => {
      if (error) {
        this.snackBar.open('Fallo al conectar con el servidor', '', {
          duration: 3000,
        });
      }
    }
    );
  }

  close() {
      this.dialogRef.close();
  }

  crearCuenta() {
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
