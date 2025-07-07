export interface FormData {
  title: string;
  description: string;
}

export interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

export interface CardProps {
  taskId: number;
}
