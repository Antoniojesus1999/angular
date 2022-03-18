import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Region } from './region';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  public cliente :Cliente = new Cliente();
  public titulo: String = "Crear Cliente";
  public errores: string[];
  regiones: Region[];
  constructor(
    private clienteService: ClienteService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarCliente();
    this.clienteService.getRegiones().subscribe(regiones => this.regiones = regiones);
  }

  cargarCliente(): void{
    this.activatedRoute.params.subscribe(params =>{
      let id = params['id']
      if(id){
        this.clienteService.getCliente(id).subscribe((cliente) => this.cliente = cliente)
      }
    })
  }

  public create() : void{
    this.clienteService.create(this.cliente).subscribe(
      cliente => {
        this.router.navigate(['/clientes'])
        Swal.fire('Nuevo cliente', `El cliente ${cliente.nombre} ha sido creado con exito`, 'success')
      },
      err=>{
        this.errores = err.error.errors as string[];
        console.log("Codigo de error desde el backen "+ err.status);
        console.log(err.error.errors);
      }

    )
  }

  update():void{
    this.clienteService.update(this.cliente).subscribe(
      response =>{
        this.router.navigate(['/clientes'])
        Swal.fire('Cliente Actualizado', `${response.mensaje}: ${response.cliente.nombre}`, 'success')
      },
      err=>{
        this.errores = err.error.errors as string[];
        console.log("Codigo de error desde el backen "+ err.status);
        console.log(err.error.errors);
      }
    )
  }

  compararRegion(r1:Region, r2:Region):boolean{
    if(r1 === undefined && r2 === undefined){
      return true;
    }
    return r1 === null || r2 === null || r1 === undefined || r2 === undefined? false: r1.id === r2.id;
  }

}
