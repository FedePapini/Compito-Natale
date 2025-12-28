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
    <input style="width:100%" [(ngModel)]="email" name="email" type="email" autocomplete="username" />

    <label>Password</label>
    <input style="width:100%" [(ngModel)]="password" name="password" type="password" autocomplete="current-password" />

    <button type="button" (click)="onLogin()" [disabled]="loading"
      style="margin-top:12px;width:100%">
      {{ loading ? 'Accesso...' : 'Accedi' }}
    </button>

    <p style="margin-top:12px">
      Non hai un account? <a routerLink="/auth/register">Registrati</a>
    </p>

    <p *ngIf="error" style="color:red;white-space:pre-wrap">{{ error }}</p>
  </div>
  `,
})
export class LoginComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  email = '';
  password = '';
  loading = false;
  error = '';

  async onLogin() {
    this.error = '';
    if (!this.email || !this.password) {
      this.error = 'Inserisci email e password.';
      return;
    }

    this.loading = true;
    try {
      const cred = await this.auth.login(this.email.trim(), this.password);
      const role = await this.auth.getRole(cred.user.uid);

      // ✅ redirect per ruolo
      this.router.navigateByUrl(role === 'admin' ? '/admin' : '/me');
    } catch (e: any) {
      console.error('LOGIN ERROR', e);
      this.error = (e?.code ? `${e.code}\n` : '') + (e?.message ?? String(e));
    } finally {
      this.loading = false;
    }
  }
}
