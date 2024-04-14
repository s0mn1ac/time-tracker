/* Angular */
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/* PrimeNG */
import { PrimeNGModule } from '../../modules/primeng.module';

/* Services */
import { TaskStoreService } from '../../store/task/task-store.service';

/* Model */
import { TaskModel } from '../../models/task.model';

/* Interfaces */
import { SubTaskInterface } from '../../interfaces/sub-task.interface';

/* Pipes */
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-sub-task',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    PrimeNGModule
  ],
  templateUrl: './sub-task.component.html',
  styleUrl: './sub-task.component.scss'
})
export class SubTaskComponent {

  @Input() task!: TaskModel;
  @Input() public subTask!: SubTaskInterface;

  constructor(
    private readonly taskStoreService: TaskStoreService
  ) { }


  /* --------- On click methods --------------------------------------------------------------------------------------------------------- */

  public onClickCompleteSubTask(event: Event): void {
    this.stopPropagation(event);
    this.taskStoreService.completeSubTask(this.task, this.subTask);
  }

  public onClickReOpenSubTask(event: Event): void {
    this.stopPropagation(event);
    this.taskStoreService.reOpenSubTask(this.task, this.subTask);
  }

  public onClickDeleteSubTask(event: Event): void {
    this.stopPropagation(event);
    this.taskStoreService.deleteSubTask(this.task, this.subTask.id);
  }


  /* --------- Other public methods ----------------------------------------------------------------------------------------------------- */

  public stopPropagation(event: Event): void {
    event.stopPropagation();
    event.preventDefault();
  }

}
