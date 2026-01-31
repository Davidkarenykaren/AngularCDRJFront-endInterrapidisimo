import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServiceInter {

  private APIURL = "http://localhost:5115/api/clientes";

  constructor(private http: HttpClient){}

  getClientes(): Observable<any> {
    return this.http.get(this.APIURL);
  }

   crearCliente(cliente: any): Observable<any> {
    return this.http.post(this.APIURL, cliente);
  }

}
