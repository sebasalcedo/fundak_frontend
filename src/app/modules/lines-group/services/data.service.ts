import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@core/environments/environment';
import { Groups } from '../interfaces/groups.interface';

@Injectable({
  providedIn: 'root',
})
export class DataLineGroupService {
  public url: string = environment.base_url;
  public userData: any;
  public headers: any;
  public tokenUser: string = ' ';

  constructor(private http: HttpClient) {
    this.tokenUser = localStorage.getItem('cms_token') || ' ';
    this.userData = JSON.parse(localStorage.getItem('cms_user') || ' ')
    this.headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('x-token', this.tokenUser);
  }

  private handleError(error: any): Observable<any> {
    console.error('An error occurred:', error);
    return throwError(error);
  }

  getListLines(): Observable<any> {
    return this.http
      .get(`${this.url}/lines`, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }

  registerLine(data: any): Observable<any> {
    let jsonData = {
      name: data.name,
      indicative: data.indicative,
      description: data.description,
      user: this.userData.id,
    };
    return this.http
      .post(`${this.url}/lines`, jsonData, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }

  getLinesById(id: string): Observable<any> {
    return this.http
      .get(`${this.url}/lines/${id}`, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }


  updatedLineById(id: string, data: any ){
    let jsonData = {
      name: data.name,
      indicative: data.indicative,
      description: data.description,
      user: this.userData.id,
    };
    console.log(jsonData);
    return this.http
      .put(`${this.url}/lines/${id}`, jsonData, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }

  //** funciones para los grupos */

  registerGroup(data: any): Observable<any> {
    let jsonData = {
      name: data.name,
      description: data.description,
      line: data.line,
      user: this.userData.id,
    };
    return this.http
      .post(`${this.url}/groups`, jsonData, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }

  filterGroupsForLines(idLine: string): Observable<any> {
    return this.http
      .get(`${this.url}/groups/filterGroups/${idLine}`, {
        headers: this.headers,
      })
      .pipe(catchError(this.handleError));
  }

  getGruopById(idGroup: string): Observable<any> {
    return this.http
      .get(`${this.url}/groups/${idGroup}`, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }
  updateGroupById(id: string, data: any): Observable<any> {
    const jsonData = {
      name: data.name,
      description: data.description,
      line: data.line,
      user: this.userData.id,
    };
    return this.http
      .put(`${this.url}/groups/${id}`, jsonData, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }


  //  TODO: CORREGIR MAS ADELANTE
  deleteGroupById(id: string, grupo: any): Observable<any> {
   
    return this.http
      .delete(`${this.url}/groups/${id}/${grupo[0].id}`, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }
}
