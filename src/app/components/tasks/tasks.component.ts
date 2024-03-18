import { Component, OnInit, inject } from '@angular/core';
import { Task } from '../../models/Task';
import { CommonModule } from '@angular/common';
import { TaskItemComponent } from '../task-item/task-item.component';
import { TaskService } from '../../services/task.service';
import { error } from 'console';
import { AddTaskComponent } from '../add-task/add-task.component';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, TaskItemComponent, AddTaskComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];
  taskService = inject(TaskService);

  ngOnInit(): void {
    this.taskService.getTasks().subscribe({
      next: (tasks) => (this.tasks = tasks),
      error: (err) => console.log(err),
    });
  }

  deleteTask(task: Task) {
    this.taskService.deleteTask(task).subscribe({
      next: (res) => {
        this.tasks = this.tasks.filter((t) => t.id !== res.id);
      },
      error: (err) => console.log(err),
    });
  }

  toggleTask(task: Task) {
    task.reminder = !task.reminder;
    this.taskService.updateTaskReminder(task).subscribe();
  }

  updateTask(task: Task) {
    this.taskService.updateTask(task).subscribe({
      next: (res) => {
        this.tasks = this.tasks.map((t) => {
          if (t.id === task.id) {
            t = task;
            return t;
          }
          return t;
        });
      },
    });
  }

  addTask(task: Task) {
    this.taskService.addTask(task).subscribe({
      next: (res) => {
        this.tasks = [...this.tasks, res];
      },
      error: (err) => console.log(err),
    });
  }
}
