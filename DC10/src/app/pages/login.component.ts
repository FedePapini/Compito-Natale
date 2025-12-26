import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
  <div style="max-width:420px;margin:40px auto;padding:20px">
    <h2>Login</h2>

    <label>Email</label>
    <input style="width:100%" [(ngModel)]="email" type="email" />

    <label>Password</label>
    <input style="width:100%" [(ngModel)]="password" type="password" />

    <button (click)="onLogin()" style="margin-top:12px;width:100%">Entra</button>

    <p style="margin-top:12px">
      Non hai un account? <a routerLink="/auth/register">Registrati</a>
    </p>

    <p *ngIf="error" style="color:red">{{ error }}</p>
  </div>
  `
})
export class LoginComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  email = '';
  password = '';
  error = '';

  async onLogin() {
    this.error = '';
    try {
      await this.auth.login(this.email, this.password);
      this.router.navigateByUrl('/');
    } catch (e: any) {
      this.error = e?.message ?? 'Errore login';
    }
  }
}
