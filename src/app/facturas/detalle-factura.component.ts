import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Factura } from './models/factura';
import { FacturaService } from './services/factura.service';

@Component({
  selector: 'app-detalle-factura',
  templateUrl: './detalle-factura.component.html',
  styleUrls: ['./detalle-factura.component.css']
})
export class DetalleFacturaComponent implements OnInit {

  factura: Factura;
  titulo: string = 'Factura';
  constructor(private facturaService: FacturaService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    // Nos subscribimos a los cambios que tenga el id en la ruta para obtener el id de la factura por el que buscar luego.
    this.activatedRoute.paramMap.subscribe(params =>{
      let id = +params.get('id');
      this.facturaService.getFactura(id).subscribe(factura => this.factura = factura);
    })
  }
  
  
}
