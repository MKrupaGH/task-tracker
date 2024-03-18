import { Component, Output, EventEmitter, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task } from '../../models/Task';
import { UiService } from '../../services/ui.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss',
})
export class AddTaskComponent {
  text: string = '';
  day: string = '';
  remainder: boolean = false;

  id: number = 0;

  showAddTask: boolean = false;
  showEditTask: boolean = false;
  subscription: Subscription = new Subscription();

  @Output() onAddTask: EventEmitter<Task> = new EventEmitter();
  @Output() onUpdateTask: EventEmitter<Task> = new EventEmitter();
  uiService = inject(UiService);

  constructor() {
    this.subscription = this.uiService.onToggle().subscribe({
      next: (value) => {
        this.showAddTask = value.showAddTask;
        this.showEditTask = value.showEditTask;
        if (this.showEditTask) {
          this.id = value.task.id;
          this.text = value.task.text;
          this.day = value.task.day;
          this.remainder = value.task.reminder;
          console.log(this.remainder);
        } else if (!this.showEditTask) {
          this.text = '';
          this.day = '';
          this.remainder = false;
        }
      },
      error: (err) => {},
    });
  }

  onSubmit() {
    if (!this.text) {
      alert('Task is mandatory!');
      return;
    }

    const newTask = {
      text: this.text,
      day: this.day,
      reminder: this.remainder,
    };

    this.showEditTask
      ? this.onUpdateTask.emit({ id: this.id, ...newTask })
      : this.onAddTask.emit(newTask);

    this.uiService.toggleAddTask();
  }
}
