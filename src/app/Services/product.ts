import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { IProducts } from '../Models/iproducts';

@Injectable({
  providedIn: 'root',
})
export class Product {
  private apiUrl = 'https://api.restful-api.dev/objects';

  constructor(private http: HttpClient) {}

  // get all products
  getProducts(): Observable<IProducts[]> {
    return this.http.get<IProducts[]>(this.apiUrl);
  }

  // add product
  addProducts(product: IProducts): Observable<IProducts> {
    return this.http.post<IProducts>(this.apiUrl, product);
  }

  // update product by id
  updateProducts(id: string, product: IProducts): Observable<IProducts> {
    return this.http.put<IProducts>(`${this.apiUrl}/${id}`, product);
  }

  // delete product by id
  deleteProducts(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
