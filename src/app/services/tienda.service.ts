import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TiendaService {

  http = inject(HttpClient);

  constructor() {}

  getAllTiendas(): Observable<any> {
    return this.http.get(`${environment.baseUrl}/tiendas`);
  }

  getTiendaById(id: string): Observable<any> {
    return this.http.get(`${environment.baseUrl}/tiendas/${id}`);
  }

  createTienda(tienda: any): Observable<any> {
    return this.http.post(`${environment.baseUrl}/tiendas`, tienda);
  }

  updateTienda(id: string, tienda: any): Observable<any> {
    return this.http.put(`${environment.baseUrl}/tiendas/${id}`, tienda);
  }

  deleteTienda(id: string): Observable<any> {
    return this.http.delete(`${environment.baseUrl}/tiendas/${id}`);
  }
}
