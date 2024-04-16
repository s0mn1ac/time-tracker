/* Angular */
import { Observable, Subject, share, takeUntil, timer } from 'rxjs';

/* Interfaces */
import { TaskInterface } from '../interfaces/task.interface';
import { SubTaskInterface } from '../interfaces/sub-task.interface';

export class TaskModel implements TaskInterface {

  public id!: string;
  public title!: string;
  public subtitle!: string;
  public created!: string;
  public completed!: string;
  public subTasks!: SubTaskInterface[];
  public hours!: number;
  public minutes!: number;
  public seconds!: number;
  public startDate!: string;
  public trackers!: string[][];
  public running!: boolean;
  public expanded!: boolean;
  public checked!: boolean;

  private _timer$!: Observable<number>;

  private _stop$!: Subject<boolean>;

  public constructor(init?: Partial<TaskInterface>) {
    
    Object.assign(this, init);

    if (!this.running) {
      return;
    }

    this.startClock(new Date(this.startDate));
  }


  /* --------- Getters & Setters -------------------------------------------------------------------------------------------------------- */

  get timer(): Observable<number> {
    return this._timer$;
  }


  /* --------- Other public methods ----------------------------------------------------------------------------------------------------- */

  public startClock(startDate: Date): void {
    this.running = true;
    this.startDate = startDate.toISOString();
    this.hours = 0;
    this.minutes = 0;
    this.seconds = 0;
    this._stop$ = new Subject<boolean>();
    this._timer$ = timer(0, 500).pipe(takeUntil(this._stop$), share());
    this.initTimerSubscription();
  }

  public stopClock(): void {
    this.trackers.push([this.startDate, new Date().toISOString()]);
    this._stop$.next(true);
    this.hours = 0;
    this.minutes = 0;
    this.seconds = 0;
    this.startDate = '';
    this.running = false;
  }

  public getInterface(): TaskInterface {
    return {
      id: this.id,
      title: this.title,
      subtitle: this.subtitle,
      created: this.created,
      completed: this.completed,
      subTasks: this.subTasks,
      hours: this.hours,
      minutes: this.minutes,
      seconds: this.seconds,
      startDate: this.startDate,
      trackers: this.trackers,
      running: this.running,
      expanded: this.expanded,
      checked: this.checked
    };
  }


  /* --------- Other private methods ---------------------------------------------------------------------------------------------------- */

  private initTimerSubscription(): void {
    this.timer
      .pipe(takeUntil(this._stop$))
      .subscribe(() => {
        const miliseconds: number = new Date().getTime() - new Date(this.startDate).getTime();
        this.hours = Math.floor(miliseconds / (1000 * 60 * 60));
        this.minutes = Math.floor((miliseconds % (1000 * 60 * 60)) / (1000 * 60));
        this.seconds = Math.floor((miliseconds % (1000 * 60)) / 1000);
      });
  }

}