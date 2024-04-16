/* Angular */
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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
    CommonModule,
    FormsModule,
    PrimeNGModule,
    TranslocoModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  @ViewChild('taskTitleInput') taskTitleInput!: ElementRef;

  public taskTitle: string = '';

  public taskInputPlaceholder: string = 'common.addATask';

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
      expanded: false,
      checked: false,
    }

    this.taskStoreService.addTask(task);

    this.taskTitle = '';
    this.taskInputPlaceholder = 'common.addAnotherTask';

    this.taskTitleInput.nativeElement.focus();
  }

}
