/* Angular */
import { Injectable, WritableSignal, signal } from '@angular/core';

/* Services */
import { LocalStorageService } from '../../services/local-storage/local-storage.service';

/* Models */
import { TaskModel } from '../../models/task.model';

/* Interfaces */
import { TaskInterface } from '../../interfaces/task.interface';
import { SubTaskInterface } from '../../interfaces/sub-task.interface';

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

  public modifyTask(modifiedTask: TaskModel): void {

    const tasks: TaskModel[] = this.tasks()
      .map((task: TaskModel) => task.id === modifiedTask.id
        ? new TaskModel({ ...modifiedTask.getInterface() })
        : task
      );

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

  public stopTimer(task: TaskModel): void {
    task.stopClock();
    this.modifyTask(task);
  }

  public completeTask(task: TaskModel): void {
    task.completed = new Date().toISOString();
    task.checked = true;
    this.modifyTask(task);
  }

  public reOpenTask(task: TaskModel): void {
    task.completed = '';
    task.checked = false;
    this.modifyTask(task);
  }

  public addSubTask(task: TaskModel, subTask: SubTaskInterface): void {
    task.subTasks.push(subTask);
    this.modifyTask(task);
  }

  public completeSubTask(task: TaskModel, subTask: SubTaskInterface): void {
    subTask.completed = new Date().toISOString();
    subTask.checked = true;
    this.modifyTask(task);
  }

  public reOpenSubTask(task: TaskModel, subTask: SubTaskInterface): void {
    subTask.completed = '';
    subTask.checked = false;
    this.modifyTask(task);
  }

  public deleteSubTask(task: TaskModel, id: string): void {
    const subTasks: SubTaskInterface[] = task.subTasks.filter((subTask: SubTaskInterface) => subTask.id !== id);
    task.subTasks = subTasks;
    this.modifyTask(task);
  }

}
