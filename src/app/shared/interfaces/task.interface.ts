export interface TaskInterface {
  id: string;
  title: string;
  subtitle: string;
  subTasks: TaskInterface[]
}
