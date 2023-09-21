import { AuthService } from 'src/app/services/auth.service';
import { Injectable } from '@angular/core';

export interface Token {
  token: string;
}
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import {
  Observable,
  async,
  catchError,
  map,
  switchMap,
  throwError,
} from 'rxjs';
import { Store } from '@ngrx/store';
import { TokenState, tokenSelector } from '../store/token/token.reducer';
import { setToken } from '../store/token/token.actions';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  refresh = false;
  accessToken$ = this.store.select(tokenSelector);
  token: string = '';
  constructor(
    private authService: AuthService,
    private store: Store<TokenState>
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.accessToken$.subscribe({
      next: (result: any) => {
        this.token = result.token;
      },
    });
    const req = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.token}`,
      },
    });

    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401 && !this.refresh) {
          this.refresh = true;
          return this.authService.refresh().pipe(
            switchMap((res) => {
              this.store.dispatch(setToken(res.accessToken));
              return next
                .handle(
                  request.clone({
                    setHeaders: {
                      Authorization: `Bearer ${this.token}`,
                    },
                  })
                )
                .pipe(map((x) => x));
            })
          );
        }
        this.refresh = false;
        return throwError(() => err);
      })
    );
  }
}
