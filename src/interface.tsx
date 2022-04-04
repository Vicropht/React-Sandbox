export type Priority = typeof priorities[number];

export const priorities = ['LOW', 'MEDIUM', 'HIGH'] as const;
export const priorityLabels: Record<Priority, string> = {
  LOW: 'Low Priority',
  MEDIUM: 'Medium Priority',
  HIGH: 'High Priority'
}

export interface BaseTodo {
  name: string;
  priority: Priority;
  details: string;
}

export interface Todo extends BaseTodo {
  id: number | null;
}