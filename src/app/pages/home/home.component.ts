/* Angular */
import { Component, Signal, WritableSignal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

/* Transloco */
import { TranslocoModule,  } from "@jsverse/transloco";

/* PrimeNg */
import { PrimeNGModule } from '../../shared/modules/primeng.module';

/* Services */
import { TaskStoreService } from '../../shared/store/task/task-store.service';

/* Components */
import { TaskComponent } from '../../shared/components/task/task.component';

/* Interfaces */
import { TaskInterface } from '../../shared/interfaces/task.interface';
import { orderBy } from 'lodash';

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

  public tasks: WritableSignal<TaskInterface[]> = this.taskStoreService.tasks;

  public pendingTasks: Signal<TaskInterface[]> = this.buildPendingTasksSignal();
  public completedTasks: Signal<TaskInterface[]> = this.buildCompletedTasksSignal();

  constructor(
    private readonly taskStoreService: TaskStoreService
  ) { }

  private buildPendingTasksSignal(): Signal<TaskInterface[]> {
    return computed(() => orderBy(this.tasks().filter((task: TaskInterface) => !task.completed), 'created', 'desc'));
  }

  private buildCompletedTasksSignal(): Signal<TaskInterface[]> {
    return computed(() => orderBy(this.tasks().filter((task: TaskInterface) => task.completed), 'completed', 'desc'));
  }

}
