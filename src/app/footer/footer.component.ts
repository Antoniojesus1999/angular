import { Component } from '@angular/core';
@Component({
  selector: 'footer-app',
  templateUrl : 'footer.component.html',
  styleUrls:['./footer.component.css']
})
export class FooterComponent {
  public autor: any = {nombre:'Antonio',apellido:'Ponce Vela'};
}
