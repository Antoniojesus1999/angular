import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-directiva',
  templateUrl: './directiva.component.html',
  styleUrls: ['./directiva.component.css']
})
export class DirectivaComponent {

  constructor() { }

  listaCursos: String[] =['Java','JavaScript','PHP','C#','Python'];
  estado: boolean = false;

  setEstado(): void{
    this.estado = this.estado == true?false:true;
  }
}
