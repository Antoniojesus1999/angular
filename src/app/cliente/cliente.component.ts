import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';


@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  constructor(private clienteService: ClienteService) {
   }
  clientes: Cliente[];

  ngOnInit(): void {
    this.clienteService.getClientes().subscribe(
      clientes => this.clientes = clientes
    );
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

}
