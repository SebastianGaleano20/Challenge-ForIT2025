import type { ReactNode } from "react";

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
  onDelete: (n: number) => void;
  onEdit: () => void;
}

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};
