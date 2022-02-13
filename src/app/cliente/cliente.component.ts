import { Component, OnInit } from '@angular/core';
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

}
