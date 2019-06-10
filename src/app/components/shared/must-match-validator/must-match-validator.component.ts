import { FormGroup } from '@angular/forms';

export function iguales(nombre1: string, nombre2: string) {
   return (formGroup: FormGroup) => {
       const name1  = formGroup.controls[nombre1];
       const name2  = formGroup.controls[nombre2];

       if (name1.errors && name2.errors && ! name2.errors.iguales){
           return;
       }

       if (name1.value !== name2.value) {
           name2.setErrors({ iguales: true });
       } else {
           name2.setErrors(null);
       }
   };
  }
