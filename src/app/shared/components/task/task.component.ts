/* Angular */
import { Component, Input, WritableSignal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

/* Transloco */
import { TranslocoModule } from '@jsverse/transloco';

/* PrimeNG */
import { PrimeNGModule } from '../../modules/primeng.module';

/* UUID */
import { v4 as uuidv4 } from 'uuid';

/* Services */
import { TaskStoreService } from '../../store/task/task-store.service';

/* Components */
import { SubTaskComponent } from '../sub-task/sub-task.component';

/* Models */
import { TaskModel } from '../../models/task.model';

/* Interfaces */
import { SubTaskInterface } from '../../interfaces/sub-task.interface';

/* Pipes */
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    FormsModule,
    PrimeNGModule,
    SubTaskComponent,
    TranslocoModule
  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {

  @Input() public task!: TaskModel;
  @Input() public soundEffect!: HTMLAudioElement;

  public subTaskTitle: string = '';

  public subTaskInputPlaceholder: string = 'common.addASubTask';

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

  public onClickStartTimer(event: Event): void {
    this.stopPropagation(event);
    this.taskStoreService.startTimer(this.task);
  }

  public onClickStopTimer(event: Event): void {
    this.stopPropagation(event);
    this.taskStoreService.stopTimer(this.task);
  }

  public onClickCompleteTask(event: Event): void {
    this.soundEffect.play();
    this.stopPropagation(event);
    this.taskStoreService.completeTask(this.task);
  }

  public onClickReOpenTask(event: Event): void {
    this.stopPropagation(event);
    this.taskStoreService.reOpenTask(this.task);
  }

  public onClickDeleteTask(event: Event): void {
    this.stopPropagation(event);
    this.taskStoreService.deleteTask(this.task.id);
  }

  public onClickAddSubTask(event: Event, subTaskTitle: string): void {

    this.stopPropagation(event);

    const subTask: SubTaskInterface = {
      id: uuidv4(),
      title: subTaskTitle,
      subtitle: '',
      created: new Date().toISOString(),
      completed: ''
    }

    this.taskStoreService.addSubTask(this.task, subTask);

    this.subTaskTitle = '';
    this.subTaskInputPlaceholder = 'common.addAnotherSubTask';
  }

  public onClickExpandTask(event: Event): void {
    this.stopPropagation(event);
    this.task.expanded = !this.task.expanded;
    this.taskStoreService.modifyTask(this.task);
  }


  /* --------- Other public methods ----------------------------------------------------------------------------------------------------- */

  public stopPropagation(event: Event): void {
    event.stopPropagation();
    event.preventDefault();
  }

}
