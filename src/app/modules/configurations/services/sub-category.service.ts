import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@core/environments/environment';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SubCategoryService {
  public url: string = environment.base_url;
  public userData: any;
  public headers: any;
  public tokenUser: string = '';

  constructor(private http: HttpClient) {
    this.tokenUser = localStorage.getItem('cms_token') || '';
    this.userData = JSON.parse(localStorage.getItem('cms_user') || ' ');
    this.headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('x-token', this.tokenUser);
  }

  private handleError(error: any): Observable<any> {
    console.error('An error occurred:', error);
    return throwError(error);
  }

  getListSubCategory(): Observable<any> {
    return this.http
      .get(`${this.url}/configurations/subCategoryPrograms`, {
        headers: this.headers,
      })
      .pipe(catchError(this.handleError));
  }
}
