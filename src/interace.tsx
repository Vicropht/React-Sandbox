export enum EPriority {
  LOW = 'priority.low',
  MEDIUM = 'priority.medium',
  HIGH = 'priority.medium'
}

export interface IBaseTodo {
  name: string;
  priority: EPriority;
  details: string;
}

export interface ITodo extends IBaseTodo {
  id: number | null;
}