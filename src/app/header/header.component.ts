import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../usuarios/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent{
  title: string = 'App Angular Spring';

  constructor(public authService: AuthService, private router :Router){

  }

  logout():void{
    Swal.fire('Sessión cerrada',`Hola ${this.authService.usuario.username}, has cerrado sesión con exito `, 'success');
    this.router.navigate['/login'];
     this.authService.logout();
  }
}
