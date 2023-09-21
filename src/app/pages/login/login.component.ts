import { AuthenticatorComponent } from './authenticator/authenticator.component';
import { Router } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';

import * as qrcode from 'qrcode';

import { CommonModule } from '@angular/common';
import { FormComponent } from './form/form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from 'src/app/interceptors/auth.interceptor';
import { FormlyModule } from '@ngx-formly/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthenticatorComponent,
    FormComponent,
    FormlyModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LoginComponent implements OnInit {
  loginData = {
    id: 0,
    img: '',
  };

  ngOnInit(): void {}

  onLogin(data: any) {
    this.loginData = data;
    debugger;
    if (data.otpauth_url) {
      qrcode.toDataURL(data.otpauth_url, (err: any, img: string) => {
        this.loginData.img = img;
      });
    }
  }
}
