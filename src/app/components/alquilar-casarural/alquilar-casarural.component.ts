import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-alquilar-casarural',
  templateUrl: './alquilar-casarural.component.html',
  styleUrls: ['./alquilar-casarural.component.css']
})
export class AlquilarCasaruralComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      data =>{
        console.log(data);
      }
    )
  }

}
