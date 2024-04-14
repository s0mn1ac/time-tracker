/* Interfaces */
import { SubTaskInterface } from './sub-task.interface';

export interface TaskInterface {
  id: string;
  title: string;
  subtitle: string;
  created: string;
  completed: string;
  subTasks: SubTaskInterface[];
  elapsed: number;
  startDate: string;
  trackers: string[][];
  running: boolean;
  expanded: boolean;
}
