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

/* Interfaces */
import { TaskInterface } from '../../shared/interfaces/task.interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    TranslocoModule,
    PrimeNGModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  public tasks$: Observable<TaskInterface[]> = this.taskStoreService.tasks$;

  constructor(
    private readonly taskStoreService: TaskStoreService
  ) { }

}
