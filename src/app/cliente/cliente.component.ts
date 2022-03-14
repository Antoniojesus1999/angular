import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { tap } from 'rxjs/operators';
import { ActivatedRoute, Router  } from '@angular/router';
import { ModalService } from './detalle/modal.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html'
})
export class ClienteComponent implements OnInit {

  constructor(private clienteService: ClienteService,
              private activatedRoute: ActivatedRoute,
              public modalService: ModalService
  ) {
   }

  clientes: Cliente[];
  paginador: any;
  clienteSeleccionado: Cliente;
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe( params =>{
    let page: number = +params.get('page') ;
    console.log("valor de page "+ page);
    if(!page){
      page = 0;
    }
    this.clienteService.getClientes(page).pipe(
      tap(response => {
        console.log('ClienteComponent: tap 3');
        (response.content as Cliente[]).forEach(cliente => {
          console.log(cliente.nombre);
        })
      })
    ).subscribe(response =>{
       this.clientes = response.content as Cliente[];
       this.paginador = response;
     });
  })
  }

  delete(cliente: Cliente): void{
    const swalWithBootstrapButtons = Swal.mixin({

  customClass: {
    confirmButton: 'btn btn-success',
    cancelButton: 'btn btn-danger'
  },
  buttonsStyling: false
})

swalWithBootstrapButtons.fire({
  title: 'Está seguro?',
  text: `¿Seguro que desea eliminar al cliente ${cliente.nombre} ${cliente.apellido}?`,
  icon: 'warning',
  showCancelButton: true,
  confirmButtonText: 'Sí, eliminar!!',
  cancelButtonText: 'No, cancelar!!',
  reverseButtons: true
}).then((result) => {
  if (result.value) {
    this.clienteService.delete(cliente.id).subscribe(
    reponse => {
      this.clientes = this.clientes.filter(cli => cli !== cliente)
      swalWithBootstrapButtons.fire(
        'Borrado!',
        `cliente ${cliente.nombre} eliminado con éxito`,
        'success'
      )
    })

  }
})
  }

  abrirModal(cliente :Cliente){
    this.clienteSeleccionado = cliente;
    this.modalService.abrirModal();
  }

}
