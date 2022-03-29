import { Producto } from "./producto";

export class ItemFactura {
    producto: Producto;
    cantidad: number=1;
    import: number;

    public calcularImporte():number{
        return this.cantidad * this.producto.precio;

    }
}
