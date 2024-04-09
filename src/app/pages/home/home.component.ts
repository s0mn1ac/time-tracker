/* Angular */
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

/* RxJs */
import { Observable, tap } from 'rxjs';

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
        this.pendingTasks = tasks.filter((task: TaskInterface) => !task.completed);
        this.completedTasks = tasks.filter((task: TaskInterface) => task.completed);
      })
  }

}
