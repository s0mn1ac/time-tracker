/* Angular */
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
    FormsModule,
    DatePipe,
    PrimeNGModule
  ],
  templateUrl: './sub-task.component.html',
  styleUrl: './sub-task.component.scss'
})
export class SubTaskComponent {

  @Input() task!: TaskModel;
  @Input() subTask!: SubTaskInterface;
  @Input() soundEffect!: HTMLAudioElement;

  constructor(
    private readonly taskStoreService: TaskStoreService
  ) { }


  /* --------- On click methods --------------------------------------------------------------------------------------------------------- */

  public onClickCheckOrUncheckTask(event?: Event): void {

    this.stopPropagation(event);

    if (this.subTask.checked) {
      this.taskStoreService.reOpenSubTask(this.task, this.subTask);
      return;
    }

    this.soundEffect.play();
    this.taskStoreService.completeSubTask(this.task, this.subTask);
  }

  public onClickDeleteSubTask(event?: Event): void {
    this.stopPropagation(event);
    this.taskStoreService.deleteSubTask(this.task, this.subTask.id);
  }


  /* --------- Other public methods ----------------------------------------------------------------------------------------------------- */

  public stopPropagation(event?: Event): void {
    event?.stopPropagation();
    event?.preventDefault();
  }

}
