/* Angular */
import { Component, Input } from '@angular/core';

/* PrimeNG */
import { PrimeNGModule } from '../../modules/primeng.module';

/* Interfaces */
import { TaskInterface } from '../../interfaces/task.interface';
import { TaskStoreService } from '../../store/task/task-store.service';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [
    PrimeNGModule
  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {

  @Input() public task!: TaskInterface;

  constructor(
    private readonly taskStoreService: TaskStoreService
  ) { }


  /* --------- On click methods --------------------------------------------------------------------------------------------------------- */

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
