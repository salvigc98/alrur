import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vista-propietarios',
  templateUrl: './vista-propietarios.component.html',
  styleUrls: ['./vista-propietarios.component.css']
})
export class VistaPropietariosComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  anadirCasa() {
    this.router.navigate(['/', 'anadirAlojamiento']);
  }
}
