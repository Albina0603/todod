import TaskItem from "./TaskItem";

interface Task {
  id: number;
  text: string;
  completed: boolean;
  isEditing: boolean;
}

interface TaskListProps {
  tasks: Task[];
  onToggleTask: (id: number) => void;
  onDeleteTask: (id: number) => void;
  onEditTask: (id: number, newText: string) => void;
  onStartEditing: (id: number) => void;
  onCancelEditing: (id: number) => void;
}

export default function TaskList({
  tasks,
  onToggleTask,
  onDeleteTask,
  onEditTask,
  onStartEditing,
  onCancelEditing,
}: TaskListProps) {
  return (
    <ul className="space-y-2">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleTask={onToggleTask}
          onDeleteTask={onDeleteTask}
          onEditTask={onEditTask}
          onStartEditing={onStartEditing}
          onCancelEditing={onCancelEditing}
        />
      ))}
    </ul>
  );
}