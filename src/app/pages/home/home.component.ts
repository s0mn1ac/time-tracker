/* Angular */
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

/* RxJs */
import { Observable } from 'rxjs';

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

  public tasks$: Observable<TaskInterface[]> = this.taskStoreService.tasks$;

  public pendingTasks!: TaskInterface[];
  public completedTasks!: TaskInterface[];

  constructor(
    private readonly taskStoreService: TaskStoreService
  ) {
    this.initSubscriptions();
  }

  private initSubscriptions(): void {
    
    this.tasks$
      .subscribe((tasks: TaskInterface[]) => {
        this.pendingTasks = orderBy(tasks.filter((task: TaskInterface) => !task.completed), 'created', 'desc');
        this.completedTasks = orderBy(tasks.filter((task: TaskInterface) => task.completed), 'completed', 'desc');
        console.log(this.completedTasks)
      })
  }

}
