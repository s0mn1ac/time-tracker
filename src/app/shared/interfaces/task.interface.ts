export interface TaskInterface {
  id: string;
  title: string;
  subtitle: string;
  created: string;
  completed: string;
  subTasks: TaskInterface[]
}
