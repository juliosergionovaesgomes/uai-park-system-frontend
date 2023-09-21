import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom, isDevMode } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app/app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { routes } from './app/app-routing.module';
import { AuthInterceptor } from './app/interceptors/auth.interceptor';
import { StoreModule, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { userReducer } from './app/store/user/user.reducer';
import { tokenReducer } from './app/store/token/token.reducer';
import { FormlyModule } from '@ngx-formly/core';
//Inputs
import { InputFieldType } from './app/@shared/input/input.component';
import { TypeOption } from '@ngx-formly/core/lib/models';

const fields: TypeOption[] = [
  {
    name: 'input-formly',
    component: InputFieldType,
  },
];

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(HttpClientModule),
    importProvidersFrom(RouterModule.forRoot(routes)),
    importProvidersFrom(FormlyModule.forRoot({ types: fields })),
    provideStore({ user: userReducer, token: tokenReducer }),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode(), trace: true }),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
}).catch((err) => console.log(err));
