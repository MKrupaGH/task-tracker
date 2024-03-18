import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Task } from '../models/Task';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  private showAddTask: boolean = false;
  private showEditTask: boolean = false;
  private task?: Task;
  private subject = new Subject<any>();

  constructor() {}

  toggleAddTask(): void {
    this.showAddTask = !this.showAddTask;
    this.showEditTask = false;
    this.subject.next({
      showAddTask: this.showAddTask,
      showEditTask: this.showEditTask,
    });
  }

  toggleEditTask(task?: Task): void {
    this.showAddTask = true;
    this.showEditTask = true;
    this.task = task;
    this.subject.next({
      showAddTask: this.showAddTask,
      showEditTask: this.showEditTask,
      task: this.task,
    });
  }

  onToggle(): Observable<any> {
    return this.subject.asObservable();
  }
}
