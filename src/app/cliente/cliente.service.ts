import { Injectable } from '@angular/core';
import { CLIENTES } from './clientes.json';
import { Cliente } from './cliente';
import { Observable, of } from 'rxjs';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClienteService{
  private url :string = 'http://localhost:8080/api/clientes';
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'})
  constructor(private http :HttpClient) { }

  getClientes():Observable<Cliente[]>{
    return this.http.get<Cliente[]>(this.url);

  }

  // getClientes():Observable<Cliente[]>{
  //   return this.http.get(this.url).pipe(
  //     map(
  //       response => response as Cliente[]
  //     )
  //   );
  // }

  create(cliente: Cliente) :Observable<Cliente>{
    return this.http.post<Cliente>(this.url,cliente,{headers: this.httpHeaders})
  }

  getCliente(id): Observable<Cliente>{
    return this.http.get<Cliente>(`${this.url}/${id}`)
  }

  update(cliente: Cliente):Observable<Cliente>{
    return this.http.put<Cliente>(`${this.url}/${cliente.id}`, cliente,{headers: this.httpHeaders})
  }

  delete(id:number): Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.url}/${id}`, {headers: this.httpHeaders})
  }
}
