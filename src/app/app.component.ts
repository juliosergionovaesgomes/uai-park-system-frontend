import { Component } from '@angular/core';
import { LayoutComponent } from './layout/layout.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  template: `<app-layout></app-layout>`,
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [LayoutComponent, CommonModule],
})
export class AppComponent {
  // users$ = this.store.select(userSelector);
  // constructor(private store: Store<UserState>) {}
}
