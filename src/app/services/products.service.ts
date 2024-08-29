import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  http = inject(HttpClient);

  constructor() {}

  getAllProductos(): Observable<any> {
    return this.http.get(`${environment.baseUrl}/articulos`);
  }

  getProductoById(id: string): Observable<any> {
    return this.http.get(`${environment.baseUrl}/articulos/${id}`);
  }

  createProducto(producto: any): Observable<any> {
    return this.http.post(`${environment.baseUrl}/articulos`, producto);
  }

  updateProducto(id: number, producto: any): Observable<any> {
    return this.http.put(`${environment.baseUrl}/articulos/${id}`, producto);
  }

  deleteProducto(id: number): Observable<any> {
    return this.http.delete(`${environment.baseUrl}/articulos/${id}`);
  }

}
