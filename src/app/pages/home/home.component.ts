/* Angular */
import { Component, Signal, WritableSignal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

/* Transloco */
import { TranslocoModule,  } from "@jsverse/transloco";

/* Lodash */
import { orderBy } from 'lodash';

/* PrimeNg */
import { PrimeNGModule } from '../../shared/modules/primeng.module';

/* Services */
import { TaskStoreService } from '../../shared/store/task/task-store.service';

/* Components */
import { TaskComponent } from '../../shared/components/task/task.component';

/* Models */
import { TaskModel } from '../../shared/models/task.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    PrimeNGModule,
    TaskComponent,
    TranslocoModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  public tasks: WritableSignal<TaskModel[]> = this.taskStoreService.tasks;

  public pendingTasks: Signal<TaskModel[]> = this.buildPendingTasksSignal();
  public completedTasks: Signal<TaskModel[]> = this.buildCompletedTasksSignal();

  constructor(
    private readonly taskStoreService: TaskStoreService
  ) { }

  private buildPendingTasksSignal(): Signal<TaskModel[]> {
    return computed(() => orderBy(this.tasks().filter((task: TaskModel) => !task.completed), 'created', 'desc'));
  }

  private buildCompletedTasksSignal(): Signal<TaskModel[]> {
    return computed(() => orderBy(this.tasks().filter((task: TaskModel) => task.completed), 'completed', 'desc'));
  }

}
