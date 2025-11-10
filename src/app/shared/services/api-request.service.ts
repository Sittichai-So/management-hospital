import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ApiRequestService {
  constructor(
    private http: HttpClient
  ) {}

  private request<T, B = any>(
    method: 'get' | 'post' | 'put' | 'delete',
    url: string,
    options?: { body?: T | B; params?: HttpParams; headers?: HttpHeaders }
  ): Observable<T> {
    const token = localStorage.getItem('access_token');
    const headers = options?.headers
      ? options.headers
          .set('Authorization', `Bearer ${token}`)
          .set('ngrok-skip-browser-warning', 'true')
      : new HttpHeaders()
          .set('Authorization', `Bearer ${token}`)
          .set('ngrok-skip-browser-warning', 'true');

    const requestOptions = {
      headers: headers,
      params: options?.params,
      body: options?.body,
    };

    return this.http
      .request<{ status: string; messages: string; data: T }>(
        method,
        url,
        requestOptions
      )
      .pipe(
        map((response) => response.data),
        catchError((error: HttpErrorResponse) => {
          console.error(`Error fetching data from ${url}`, error);
          return throwError(() => new Error('Failed to fetch data'));
        })
      );
  }

  get<T>(
    url: string,
    params?: HttpParams,
    headers?: HttpHeaders
  ): Observable<T> {
    return this.request<T>('get', url, { params, headers });
  }

  post<T, B>(url: string, body: B, headers?: HttpHeaders): Observable<T> {
    return this.request<T>('post', url, { body, headers });
  }

  put<T, B>(url: string, body: B, headers?: HttpHeaders): Observable<T> {
    return this.request<T>('put', url, { body, headers });
  }

  delete<T, B>(url: string, body: B, headers?: HttpHeaders): Observable<T> {
    return this.request<T>('delete', url, { body, headers });
  }
}
