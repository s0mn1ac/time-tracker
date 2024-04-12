/* Angular */
import { Component, Input, WritableSignal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

/* PrimeNG */
import { PrimeNGModule } from '../../modules/primeng.module';

/* Models */
import { TaskModel } from '../../models/task.model';

/* Interfaces */
import { TaskStoreService } from '../../store/task/task-store.service';

/* Pipes */
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    PrimeNGModule
  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {

  @Input() public task!: TaskModel;

  private _timer: WritableSignal<number> = signal(0);

  constructor(
    private readonly taskStoreService: TaskStoreService
  ) { }

  /* --------- Getters & Setters -------------------------------------------------------------------------------------------------------- */

  get timer(): number {
    return this._timer();
  }

  set timer(timer: number) {
    this._timer.set(timer);
  }


  /* --------- On click methods --------------------------------------------------------------------------------------------------------- */

  public onClickStartTimer(): void {
    this.taskStoreService.startTimer(this.task);
  }

  public onClickStopTimer(): void {
    this.taskStoreService.stopTimer(this.task);
  }

  public onClickCompleteTask(id: string): void {
    this.taskStoreService.completeTask(id);
  }

  public onClickReOpenTask(id: string): void {
    this.taskStoreService.reOpenTask(id);
  }

  public onClickDeleteTask(id: string): void {
    this.taskStoreService.deleteTask(id);
  }

}
