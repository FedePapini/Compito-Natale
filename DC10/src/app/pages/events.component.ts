import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { EventsService } from '../services/events.service';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <h1>Eventi</h1>

    <div *ngFor="let e of events$ | async" style="border:1px solid #ccc; padding:12px; margin-bottom:12px">
      <h3>{{ e.title }}</h3>
      <p>{{ e.date }} – {{ e.venue }}</p>
      <a [routerLink]="['/events', e.id]">Dettagli</a>
    </div>
  `
})
export class EventsComponent {
  private service = inject(EventsService);
  events$ = this.service.getEvents();
}
