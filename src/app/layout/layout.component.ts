import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  OnInit,
  importProvidersFrom,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from '../components/nav/nav.component';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { InputFieldType } from '../@shared/input/input.component';

@Component({
  selector: 'app-layout',
  template: `
    <app-nav></app-nav>
    <router-outlet></router-outlet>
  `,
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule, NavComponent, RouterModule, ReactiveFormsModule],
})
export class LayoutComponent implements OnInit {
  ngOnInit(): void {}
}
