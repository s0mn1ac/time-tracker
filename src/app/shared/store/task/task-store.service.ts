/* Angular */
import { Injectable, WritableSignal, signal } from '@angular/core';

/* Services */
import { LocalStorageService } from '../../services/local-storage/local-storage.service';

/* Interfaces */
import { TaskInterface } from '../../interfaces/task.interface';

/* Constants */
import { TasksKey } from '../../constants/local-storage.constants';

@Injectable({
  providedIn: 'root'
})
export class TaskStoreService {

  private _tasks: WritableSignal<TaskInterface[]> = signal(this.getTasks());

  constructor(
    private readonly localStorageService: LocalStorageService
  ) { }


  /* --------- Getters & Setters -------------------------------------------------------------------------------------------------------- */

  get tasks(): WritableSignal<TaskInterface[]> {
    return this._tasks;
  }

  set tasks(tasks: TaskInterface[]) {
    this._tasks.set(tasks);
  }


  /* --------- Other public methods ----------------------------------------------------------------------------------------------------- */

  public getTasks(): TaskInterface[] {
    console.log(' -> getTasks');
    return (this.localStorageService.get(TasksKey) as TaskInterface[]) ?? [];
  }

  public addTask(task: TaskInterface): void {
    const tasks: TaskInterface[] = [...this.tasks(), task];
    this.tasks = tasks;
    this.localStorageService.set(TasksKey, tasks);
  }

  public deleteTask(id: string): void {
    const tasks: TaskInterface[] = this.tasks().filter((task: TaskInterface) => task.id !== id);
    this.tasks = tasks;
    this.localStorageService.set(TasksKey, tasks);
  }

  public completeTask(id: string): void {
    const completed: string = new Date().toISOString();
    const tasks: TaskInterface[] = this.tasks().map((task: TaskInterface) => task.id === id ? { ...task, completed } : task);
    this.tasks = tasks;
    this.localStorageService.set(TasksKey, tasks);
  }

  public reOpenTask(id: string): void {
    const completed: string = '';
    const tasks: TaskInterface[] = this.tasks().map((task: TaskInterface) => task.id === id ? { ...task, completed } : task);
    this.tasks = tasks;
    this.localStorageService.set(TasksKey, tasks);
  }

}
