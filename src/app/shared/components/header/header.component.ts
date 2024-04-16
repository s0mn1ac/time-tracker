/* Angular */
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

/* Transloco */
import { TranslocoModule } from '@jsverse/transloco';

/* PrimeNG */
import { PrimeNGModule } from '../../modules/primeng.module';

/* UUID */
import { v4 as uuidv4 } from 'uuid';

/* Services */
import { TaskStoreService } from '../../store/task/task-store.service';

/* Interfaces */
import { TaskInterface } from '../../interfaces/task.interface';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    FormsModule,
    PrimeNGModule,
    TranslocoModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  public taskTitle: string = '';

  public taskInputPlaceholder: string = 'addATask';

  constructor(
    private readonly taskStoreService: TaskStoreService
  ) { }


  /* --------- On click methods --------------------------------------------------------------------------------------------------------- */

  public onClickAddTask(taskTitle: string): void {

    const task: TaskInterface = {
      id: uuidv4(),
      title: taskTitle,
      subtitle: '',
      created: new Date().toISOString(),
      completed: '',
      subTasks: [],
      hours: 0,
      minutes: 0,
      seconds: 0,
      startDate: '',
      trackers: [],
      running: false,
      expanded: false
    }

    this.taskStoreService.addTask(task);

    this.taskTitle = '';
    this.taskInputPlaceholder = 'addAnotherTask';
  }

}
