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

  public inputPlaceholder: string = 'addATask';

  constructor(
    private readonly taskStoreService: TaskStoreService
  ) { }


  /* --------- On change methods -------------------------------------------------------------------------------------------------------- */

  public onClickAddTask(taskTitle: string): void {

    const task: TaskInterface = {
      id: uuidv4(),
      title: taskTitle,
      subtitle: '',
      subTasks: []
    }

    this.taskStoreService.addTask(task);

    this.taskTitle = '';
    this.inputPlaceholder = 'addAnotherTask';
  }

}
