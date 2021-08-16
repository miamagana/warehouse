import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  constructor(private readonly http: HttpClient) {}

  addArticles(file: any): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<any>('/api/articles/add', formData);
  }
}
