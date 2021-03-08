import { Injectable } from '@angular/core';
import { UserModel } from 'src/app/models/user/user-model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

// rxjs
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  headers;
  baseUrl;
  userToken: string;
  expiresInToken: number;

  constructor(
    private http: HttpClient
  ) {
    this.getHeadersRequest()
    this.baseUrl = environment.baseUrl;
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('expiresIn');
  }

  login(user: UserModel): Observable<any> {
    return this.http.post<any>(
      `${this.baseUrl}/Security/api/SEG`,
      user
    ).pipe(
      map((response: any) => {
        const token = response.token;
        this.saveTokenUser(token, 36000)
        return response;
      })
    )
  }

  register(user: UserModel): Observable<any>{
    return this.http.post<any>(
      `${this.baseUrl}/Seleccion/api/SOL/RegistroInicialSolicitante`,
      user
    ).pipe(
      map((response: any) => {
        const token = response.token;
        this.saveTokenUser(token, 3600)
        return response;
      })
    )
  }

  private saveTokenUser(token: string, expiresIn: number) {
    this.userToken = token;
    localStorage.setItem('token', token);
    const today = new Date();
    today.setSeconds(expiresIn);
    localStorage.setItem('expiresIn', today.getTime().toString());
  }



  statusLogin(): boolean {

    if (this.userToken.length < 2) {
      return false;
    }

    const expiresIn = Number(localStorage.getItem('expiresIn'))
    const expiresInDate = new Date();
    expiresInDate.setTime(expiresIn);

    if (expiresInDate > new Date()) {
      return true;
    }else {
      return false;
    }

  }

  getHeadersRequest(): HttpHeaders {
    return this.headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": "Bearer " + this.readToken()
    });
  }

  readToken() {
    if (localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token');
    }else {
      this.userToken = ''
    }
    return this.userToken;
  }

}
