import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
  <div style="max-width:420px;margin:40px auto;padding:20px">
    <h2>Registrazione</h2>

    <label>Nome</label>
    <input style="width:100%" [(ngModel)]="displayName" name="displayName" autocomplete="name" />

    <label>Email</label>
    <input style="width:100%" [(ngModel)]="email" name="email" type="email" autocomplete="username" />

    <label>Password (min 6 caratteri)</label>
    <input style="width:100%" [(ngModel)]="password" name="password" type="password" autocomplete="new-password" />

    <button type="button" (click)="onRegister()" [disabled]="loading"
      style="margin-top:12px;width:100%">
      {{ loading ? 'Creazione...' : 'Registrati' }}
    </button>

    <p style="margin-top:12px">
      Hai già un account? <a routerLink="/auth/login">Login</a>
    </p>

    <p *ngIf="error" style="color:red;white-space:pre-wrap">{{ error }}</p>
  </div>
  `,
})
export class RegisterComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  displayName = '';
  email = '';
  password = '';
  loading = false;
  error = '';

  async onRegister() {
    this.error = '';

    if (!this.displayName || !this.email || !this.password) {
      this.error = 'Compila nome, email e password.';
      return;
    }
    if (this.password.length < 6) {
      this.error = 'Password troppo corta (minimo 6 caratteri).';
      return;
    }

    this.loading = true;
    try {
      await this.auth.register(this.email.trim(), this.password, this.displayName.trim());
      this.router.navigateByUrl('/me');
    } catch (e: any) {
      console.error('REGISTER ERROR', e);
      this.error = (e?.code ? `${e.code}\n` : '') + (e?.message ?? String(e));
    } finally {
      this.loading = false;
    }
  }
}
