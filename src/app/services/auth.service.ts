import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { environment } from 'src/environments/environment.development';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  static authEmitter = new EventEmitter<boolean>();
  constructor(private readonly http: HttpClient) {}

  register(body: any): Observable<any> {
    return this.http.post(`${environment.api}/register`, body);
  }

  login(body: any): Observable<any> {
    return this.http.post(`${environment.api}/login`, body);
  }

  authenticatorLogin(body: any): Observable<any> {
    return this.http.post(`${environment.api}/two-factor`, body, {
      withCredentials: true,
    });
  }

  googleLogin(body: any): Observable<any> {
    return this.http.post(`${environment.api}/google-auth`, body, {
      withCredentials: true,
    });
  }

  user(): Observable<any> {
    return this.http.get(`${environment.api}/user`);
  }

  refresh(): Observable<any> {
    return this.http.post(
      `${environment.api}/refresh`,
      {},
      {
        withCredentials: true,
      }
    );
  }

  logout(): Observable<any> {
    return this.http.post(
      `${environment.api}/logout`,
      {},
      {
        withCredentials: true,
      }
    );
  }
}
