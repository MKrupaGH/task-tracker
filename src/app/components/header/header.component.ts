import { Component, inject } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { UiService } from '../../services/ui.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonComponent, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  title: string = 'Task Tracker';

  showAddTask: boolean = false;
  subscription: Subscription = new Subscription();

  uiService = inject(UiService);
  router = inject(Router);

  constructor() {
    this.subscription = this.uiService.onToggle().subscribe({
      next: (value) => {
        this.showAddTask = value.showAddTask;
      },
      error: (err) => {},
    });
  }

  toggleAddTask() {
    this.uiService.toggleAddTask();
  }

  hasRoute(route: string) {
    return this.router.url === route;
  }
}
