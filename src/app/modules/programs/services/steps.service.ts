import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@core/environments/environment';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StepsService {
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

  getStepsByProgram(id: string): Observable<any> {
    return this.http
      .get(`${this.url}/steps/listStepByProgram/${id}`, {
        headers: this.headers,
      })
      .pipe(catchError(this.handleError));
  }

  getListSteps(): Observable<any> {
    return this.http
      .get(`${this.url}/steps`, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }

  registerSteps( data: any): Observable<any> {
   
    return this.http
      .post(`${this.url}/steps`, data, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }

  updatedStep(id: string, data: any): Observable<any> {
    let jsonData = {
      numberStep: data.numberStep,
      interaction: data.interaction,
      media: data.media,
      description: data.description,

      user: this.userData.id,
    };

    return this.http
      .put(`${this.url}/steps/${id} `, jsonData, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }

  deleteStep(id: string): Observable<any> {
    return this.http
      .delete(`${this.url}/steps/${id}/${id}`, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }
}
