/* Angular */
import { Injectable } from '@angular/core';

/* RxJs */
import { BehaviorSubject, Observable } from 'rxjs';

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
  
  private _tasks = new BehaviorSubject<TaskInterface[]>(this.getTasks());
  private _tasks$: Observable<TaskInterface[]> = this._tasks.asObservable();

  constructor(
    private readonly localStorageService: LocalStorageService
  ) { }


  /* --------- Getters & Setters -------------------------------------------------------------------------------------------------------- */

  get tasks(): TaskInterface[] {
    return this._tasks.getValue();
  }

  set tasks(tasks: TaskInterface[]) {
    this._tasks.next(tasks);
  }

  get tasks$(): Observable<TaskInterface[]> {
    return this._tasks$;
  }


  /* --------- Other public methods ----------------------------------------------------------------------------------------------------- */

  public getTasks(): TaskInterface[] {
    return (this.localStorageService.get(TasksKey) as TaskInterface[]) ?? [];
  }

  public addTask(task: TaskInterface): void {
    const tasks: TaskInterface[] = [...this.tasks, task];
    this._tasks.next(tasks);
    this.localStorageService.set(TasksKey, tasks);
  }

  public deleteTask(id: string): void {
    const tasks: TaskInterface[] = this.tasks.filter((task: TaskInterface) => task.id !== id);
    this._tasks.next(tasks);
    this.localStorageService.set(TasksKey, tasks);
  }

  public completeTask(id: string): void {
    const completed: string = new Date().toISOString();
    const tasks: TaskInterface[] = this.tasks.map((task: TaskInterface) => task.id === id ? { ...task, completed } : task);
    this._tasks.next(tasks);
    this.localStorageService.set(TasksKey, tasks);
  }

  public reOpenTask(id: string): void {
    const completed: string = '';
    const tasks: TaskInterface[] = this.tasks.map((task: TaskInterface) => task.id === id ? { ...task, completed } : task);
    this._tasks.next(tasks);
    this.localStorageService.set(TasksKey, tasks);
  }

}
