import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.models';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private readonly http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('/api/products/all');
  }

  addProducts(file: any): Observable<Product[]> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<Product[]>('/api/products/add', formData);
  }

  orderProducts(cart: Record<string, number>): Observable<void> {
    return this.http.post<void>('/api/products/sell', cart);
  }
}
