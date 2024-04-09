export interface TaskInterface {
  id: string;
  title: string;
  subtitle: string;
  completed: boolean;
  subTasks: TaskInterface[]
}
