import { Observable, catchError, map, of, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from "@auth0/angular-jwt";

import { User } from '../models/user.model';
import { environment } from '@core/environments/environment';

const helper = new JwtHelperService();
 
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url: string = environment.base_url;
  public userData: User | undefined;


  constructor( private http:HttpClient) { }

  login(data: any){

    return this.http.post(`${this.url}/auth`, data).pipe(
      tap(( resp: any) => {
        localStorage.setItem('cms_token',resp.token);
        localStorage.setItem('cms_user',JSON.stringify(resp.userDB));

      })
    )

  }
  getIdentity(): boolean {
    const token = localStorage.getItem('cms_token') || '';
  
    // Verificar si el token está vacío
    if (token === '') {
      return false;
    }
  
    // Verificar si el token ha expirado utilizando una función helper llamada isTokenExpired
    if (helper.isTokenExpired(token)) {
      return false;
    }
  
    // Si el token no está vacío y no ha expirado, se considera válido
    return true;
  }

  validateToken():Observable<boolean>{
    const token = localStorage.getItem('token') || '';
    return this.http.get(`${this.url}/auth/renewToken`,{
      headers:{
        'x-token':token
      }
    }).pipe(
        tap((res: any) => {

          const { id, name, last_name, email, password, rol,  img} =  res.usuario;
          this.userData = new User(id, name, last_name, email, ' ', rol,  img);
          localStorage.setItem('token', res.token);

        }),
        map((resp) => true),
        catchError((error) => of(false))
    )
  }

}
