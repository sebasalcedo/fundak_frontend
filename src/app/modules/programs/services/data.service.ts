import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@core/environments/environment';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProgramsService {
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

  getListPrograms(): Observable<any> {
    return this.http
      .get(`${this.url}/programs`, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }

  getProgramById(id: string): Observable<any>{
    return this.http
    .get(`${this.url}/programs/${id}`, { headers: this.headers })
    .pipe(catchError(this.handleError));
  }

  registerPrograms(data: any): Observable<any> {
   
    let jsonData = {
      program_name: data.program_name,
      type: data.type,
      coverage: data.coverage,
      menu_option: data.menu_option,
      state: data.state,
      program_type: data.program_type,
      Subcategory: data.Subcategory,
      Timezone_from: data.Timezone_from,
      chatbot: data.chatbot,
      start_date: data.start_date,
      end_date: data.end_date,
      groups: data.Groups,
      user: this.userData.id,
    };

    return this.http
      .post(`${this.url}/programs `, jsonData, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }

  updatedPrograms(id: string,  data: any): Observable<any>{

    let jsonData = {
      program_name: data.program_name,
      type: data.type,
      coverage: data.coverage,
      menu_option: data.menu_option,
      state: data.state,
      program_type: data.program_type,
      Subcategory: data.Subcategory,
      Timezone_from: data.Timezone_from,
      chatbot: data.chatbot,
      start_date: data.start_date,
      end_date: data.end_date,
      groups: data.Groups,
      user: this.userData.id,
    };

    return this.http
      .put(`${this.url}/programs/${id} `, jsonData, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }




  






}
