import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { TokenState, tokenSelector } from 'src/app/store/token/token.reducer';
import { setToken } from 'src/app/store/token/token.actions';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule],
  providers: [AuthService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  authenticate: boolean = false;
  constructor(
    private authService: AuthService,
    private store: Store<TokenState>
  ) {}

  ngOnInit(): void {
    AuthService.authEmitter.subscribe((authenticated) => {
      this.authenticate = authenticated;
    });
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        this.store.dispatch(setToken(''));

        AuthService.authEmitter.emit(false);
      },
      error: (err) => {
        this.authenticate = false;
      },
    });
  }
}
