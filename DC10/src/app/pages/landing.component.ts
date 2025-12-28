import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
  <div style="min-height:100vh;background:#0b0b0b;color:#f5f5f5;padding:40px">
    <div style="max-width:1000px;margin:0 auto">
      <h1 style="font-size:56px;letter-spacing:2px;margin:0">DC10</h1>
      <p style="opacity:.85;max-width:600px;margin-top:12px">
        Landing pubblica stile club. Da qui l’utente vede gli eventi e può comprare i biglietti.
      </p>

      <div style="margin-top:24px;display:flex;gap:12px;flex-wrap:wrap">
        <a routerLink="/events" style="border:1px solid #fff;padding:10px 14px;text-decoration:none;color:#fff">
          Vedi eventi
        </a>
        <a routerLink="/auth/login" style="border:1px solid #fff;padding:10px 14px;text-decoration:none;color:#fff">
          Accedi
        </a>
        <a routerLink="/auth/register" style="border:1px solid #fff;padding:10px 14px;text-decoration:none;color:#fff">
          Registrati
        </a>
      </div>
    </div>
  </div>
  `
})
export class LandingComponent {}
