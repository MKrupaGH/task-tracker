import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Task } from '../../models/Task';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { UiService } from '../../services/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.scss',
})
export class TaskItemComponent {
  @Input() task?: Task;
  @Output() onDeleteTask: EventEmitter<Task> = new EventEmitter();
  @Output() onToggleReminder: EventEmitter<Task> = new EventEmitter();
  @Output() onEditTask: EventEmitter<Task> = new EventEmitter();
  faTimes = faTimes;
  faEdit = faEdit;

  uiService = inject(UiService);
  // showAddTask: boolean = false;
  // showEditTask: boolean = false;
  // subscription: Subscription = new Subscription();

  // constructor() {
  //   this.subscription = this.uiService.onToggle().subscribe({
  //     next: (value) => {
  //       this.showAddTask = value.showAddTask;
  //       this.showEditTask = value.showEditTask;
  //     },
  //     error: (err) => {},
  //   });
  // }

  onDelete(task?: Task) {
    this.onDeleteTask.emit(task);
  }

  onToggle(task?: Task) {
    this.onToggleReminder.emit(task);
  }

  onEdit(task?: Task) {
    this.uiService.toggleEditTask(task);
    this.onEditTask.emit(task);
  }
}
