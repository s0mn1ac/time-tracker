export interface TaskInterface {
  id: string;
  title: string;
  subtitle: string;
  created: Date;
  completed: Date | null;
  subTasks: TaskInterface[]
}
