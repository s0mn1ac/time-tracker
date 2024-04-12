/* Angular */
import { Injectable, WritableSignal, signal } from '@angular/core';

/* Services */
import { LocalStorageService } from '../../services/local-storage/local-storage.service';

/* Models */
import { TaskModel } from '../../models/task.model';

/* Interfaces */
import { TaskInterface } from '../../interfaces/task.interface';

/* Constants */
import { TasksKey } from '../../constants/local-storage.constants';

@Injectable({
  providedIn: 'root'
})
export class TaskStoreService {

  private _tasks: WritableSignal<TaskModel[]> = signal(this.getTasks());

  constructor(
    private readonly localStorageService: LocalStorageService
  ) { }


  /* --------- Getters & Setters -------------------------------------------------------------------------------------------------------- */

  get tasks(): WritableSignal<TaskModel[]> {
    return this._tasks;
  }

  set tasks(tasks: TaskModel[]) {
    this._tasks.set(tasks);
  }


  /* --------- Other public methods ----------------------------------------------------------------------------------------------------- */

  public getTasks(): TaskModel[] {
    const tasks: TaskInterface[] = (this.localStorageService.get(TasksKey) as TaskInterface[]) ?? [];
    return tasks.map((task: TaskInterface) => new TaskModel(task));
  }

  public addTask(task: TaskInterface): void {
    const tasks: TaskModel[] = [...this.tasks(), new TaskModel(task)];
    this.tasks = tasks;
    this.localStorageService.set(TasksKey, tasks.map((task: TaskModel) => task.getInterface()));
  }

  public deleteTask(id: string): void {
    const tasks: TaskModel[] = this.tasks().filter((task: TaskModel) => task.id !== id);
    this.tasks = tasks;
    this.localStorageService.set(TasksKey, tasks.map((task: TaskModel) => task.getInterface()));
  }

  public startTimer(taskToStart: TaskModel): void {
    const startDate: string = taskToStart.startDate;
    taskToStart.startClock(startDate ? new Date(taskToStart.startDate) : new Date());
    const tasks: TaskModel[] = this.tasks()
      .map((task: TaskModel) => task.id === taskToStart.id ? new TaskModel(taskToStart.getInterface()) : task);
    this.tasks = tasks;
    this.localStorageService.set(TasksKey, tasks.map((task: TaskModel) => task.getInterface()));
  }

  public stopTimer(taskToStop: TaskModel): void {
    taskToStop.stopClock();
    const tasks: TaskModel[] = this.tasks()
      .map((task: TaskModel) => task.id === taskToStop.id ? new TaskModel(taskToStop.getInterface()) : task);
    this.tasks = tasks;
    this.localStorageService.set(TasksKey, tasks.map((task: TaskModel) => task.getInterface()));
  }

  public completeTask(id: string): void {
    const completed: string = new Date().toISOString();
    const tasks: TaskModel[] = this.tasks().map((task: TaskModel) => task.id === id ? new TaskModel({ ...task, completed }) : task);
    this.tasks = tasks;
    this.localStorageService.set(TasksKey, tasks.map((task: TaskModel) => task.getInterface()));
  }

  public reOpenTask(id: string): void {
    const completed: string = '';
    const tasks: TaskModel[] = this.tasks().map((task: TaskModel) => task.id === id ? new TaskModel({ ...task, completed }) : task);
    this.tasks = tasks;
    this.localStorageService.set(TasksKey, tasks.map((task: TaskModel) => task.getInterface()));
  }

}
