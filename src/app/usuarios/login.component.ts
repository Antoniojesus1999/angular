import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from './auth.service';
import { Usuario } from './usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) {
    this.usuario = new Usuario();
   }
  
  titulo: string  ='Por favor Inicia Sesión';
  usuario: Usuario;

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      Swal.fire('Login',`Hola ${this.authService.usuario.username} ya estás autenticado`, 'info');
      this.router.navigate(['/clientes']);
    }
  }

  login(): void{
    console.log(this.usuario);
    if (this.usuario.username == null || this.usuario.password == null) {
      Swal.fire('Error al inciar sesión', 'Usuario o contraseña vacías! ', 'error');
    }

    this.authService.login(this.usuario).subscribe(response =>{
      console.log(response);

      this.authService.guardarUsuario(response.access_token);
      this.authService.guardarToken(response.access_token);

      let usuario = this.authService.usuario;
      this.router.navigate(['/clientes']);
      Swal.fire('Login', `Hola ${usuario.username}, has iniciado sesión con exión`, 'success');
    }, err=>{
      if (err.status == 400) {
        Swal.fire('Error al iniciar sesión','El usuario o la contraseña son incorrectas!','error');
      }
    })
  }

}
