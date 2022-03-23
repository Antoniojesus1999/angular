import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { Observable, throwError } from 'rxjs';
import { HttpClient,HttpEvent,HttpHeaders, HttpRequest} from '@angular/common/http';
import { map, catchError, tap} from 'rxjs/operators';
import { Router } from '@angular/router';
import { Region } from './region';

@Injectable({
  providedIn: 'root'
})
export class ClienteService{
  private url :string = 'http://localhost:8080/api/clientes';
  constructor(private http :HttpClient, private router :Router) { }

  //Comentado por que utilizamos HTTP_INTERCEPTOR para agregarlo automaticamente
  /*private agregarAuthorizationHeader(){
      let token = this.authService.token;
      if(token != null){
          return this.httpHeaders.append('Authorization','Bearer ' + token );
      }
      return this.httpHeaders;
  }*/

  getRegiones(): Observable<Region[]>{
    return this.http.get<Region[]>(this.url+'/regiones');
  }

  getClientes(page: number):Observable<any>{
    return this.http.get(this.url + '/page/'+ page).pipe(
      tap((response: any) =>{
        console.log('ClienteService: tap 1');
        (response.content as Cliente[]).forEach(cliente =>{
          console.log(cliente.nombre);
        }
        )
      }),
      map((response: any)=> {
        (response.content as Cliente[]).map(cliente =>{
          cliente.nombre = cliente.nombre.toUpperCase();
          return cliente;
        });
        return response;
    }),
    tap(response =>{
      console.log('ClienteService: tap 2');
      (response.content as Cliente[]).forEach(cliente =>{
        console.log(cliente.nombre);
      }
      )
    }));

  }

  // getClientes():Observable<Cliente[]>{
  //   return this.http.get(this.url).pipe(
  //     map(
  //       response => response as Cliente[]
  //     )
  //   );
  // }

  create(cliente: Cliente) :Observable<Cliente>{
    return this.http.post(this.url,cliente).pipe(
      map((response :any) => response.cliente as Cliente),
      catchError(e => {
        // dejamos que capture el error y no lo quitamos como los demas por que también estamos capturando los errores
        // del formulario.
        if(e.status==400){
          return throwError(e);
        }
        if (e.error.mensaje) {
          console.error(e.error.mensaje)
        }
          return throwError(e);
      })
    )
  }

  getCliente(id): Observable<Cliente>{
    return this.http.get<Cliente>(`${this.url}/${id}`).pipe(
      catchError(e => {
      if (e.status = 401 && e.error.mensaje) {
        this.router.navigate(['/clientes']);
        console.log(e.error.mensaje);
        }
          return throwError(e);
      })
    )
  }

  update(cliente: Cliente):Observable<any>{
    return this.http.put<Cliente>(`${this.url}/${cliente.id}`, cliente).pipe(
      catchError(e => {
        if(e.status==400){
          return throwError(e);
        }
        if (e.error.mensaje) {
          console.error(e.error.mensaje)
        }
          return throwError(e);
      })
    )
  }

  delete(id:number): Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.url}/${id}`).pipe(
      catchError(e => {
        if (e.error.mensaje) {
          console.error(e.error.mensaje)
        }
          return throwError(e);
      })
    )
  }

  subirFoto(archivo: File, id):Observable<HttpEvent<{}>>{
   
    let formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("id",id);
    let httpHeaders = new HttpHeaders();
    
    const req = new HttpRequest('POST',`${this.url}/upload`,formData , {
      reportProgress: true,
      headers: httpHeaders
    });
    return this.http.request(req)
  }


}
