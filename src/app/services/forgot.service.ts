import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
@Injectable({
  providedIn: 'root',
})
export class ForgotService {
  constructor(private readonly http: HttpClient) {}

  forgot(body: any): Observable<any> {
    return this.http.post(`${environment.api}/forgot`, body);
  }
  reset(body: any): Observable<any> {
    return this.http.post(`${environment.api}/reset`, body);
  }
}
