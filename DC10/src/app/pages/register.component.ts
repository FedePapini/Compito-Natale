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
    <input style="width:100%" [(ngModel)]="displayName" />

    <label>Email</label>
    <input style="width:100%" [(ngModel)]="email" type="email" />

    <label>Password</label>
    <input style="width:100%" [(ngModel)]="password" type="password" />

    <button (click)="onRegister()" style="margin-top:12px;width:100%">Crea account</button>

    <p style="margin-top:12px">
      Hai già un account? <a routerLink="/auth/login">Login</a>
    </p>

    <p *ngIf="error" style="color:red">{{ error }}</p>
  </div>
  `
})
export class RegisterComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  displayName = '';
  email = '';
  password = '';
  error = '';

  async onRegister() {
    this.error = '';
    try {
      await this.auth.register(this.email, this.password, this.displayName);
      this.router.navigateByUrl('/');
    } catch (e: any) {
      this.error = e?.message ?? 'Errore registrazione';
    }
  }
}
