import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  http = inject(HttpClient);

  constructor() {}

  getClienteById(id: string): Observable<any> {
    return this.http.get(`${environment.baseUrl}/clientes/${id}`);
  }

  updateCliente(id: string, cliente: any): Observable<any> {
    return this.http.put(`${environment.baseUrl}/clientes/${id}`, cliente);
  }

  deleteCliente(id: string): Observable<any> {
    return this.http.delete(`${environment.baseUrl}/clientes/${id}`);
  }
}
