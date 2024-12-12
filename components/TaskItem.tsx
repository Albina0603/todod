import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Check, Edit } from "lucide-react";

interface Task {
  id: number;
  text: string;
  completed: boolean;
  isEditing: boolean;
}

interface TaskItemProps {
  task: Task;
  onToggleTask: (id: number) => void;
  onDeleteTask: (id: number) => void;
  onEditTask: (id: number, newText: string) => void;
  onStartEditing: (id: number) => void;
  onCancelEditing: (id: number) => void;
}

export default function TaskItem({
  task,
  onToggleTask,
  onDeleteTask,
  onEditTask,
  onStartEditing,
  onCancelEditing,
}: TaskItemProps) {
  const [localText, setLocalText] = useState(task.text); // Local state for editing text

  const handleSave = () => {
    if (localText.trim()) {
      onEditTask(task.id, localText);
    }
  };

  return (
    <li
      className={`flex items-center justify-between p-2 rounded ${
        task.completed ? "bg-green-100" : "bg-gray-100"
      }`}
    >
      {task.isEditing ? (
        <div className="flex items-center">
          <Input
            type="text"
            value={localText}
            onChange={(e) => setLocalText(e.target.value)} // Update local text
            className="mr-2"
          />
          <Button
            onClick={handleSave} // Save changes when clicking this button
            variant="outline"
            size="icon"
            aria-label="Save changes"
          >
            <Check className="w-4 h-4 text-green-500" />
          </Button>
          <Button
            onClick={() => onCancelEditing(task.id)} // Cancel editing
            variant="outline"
            size="icon"
            aria-label="Cancel editing"
          >
            <Trash2 className="w-4 h-4 text-gray-500" />
          </Button>
        </div>
      ) : (
        <>
          <span
            className={
              task.completed ? "line-through text-gray-500" : "text-gray-800"
            }
          >
            {task.text}
          </span>
          <div>
            <Button
              onClick={() => onToggleTask(task.id)}
              className="mr-2"
              variant="outline"
              size="icon"
              aria-label={
                task.completed ? "Mark as incomplete" : "Mark as complete"
              }
            >
              <Check
                className={`w-4 h-4 ${
                  task.completed ? "text-green-500" : "text-gray-500"
                }`}
              />
            </Button>
            <Button
              onClick={() => onStartEditing(task.id)} // Start editing mode
              variant="outline"
              size="icon"
              aria-label="Edit task"
            >
              <Edit className="w-4 h-4 text-blue-500" />
            </Button>
            <Button
              onClick={() => onDeleteTask(task.id)} // Delete task
              variant="outline"
              size="icon"
              aria-label="Delete task"
            >
              <Trash2 className="w-4 h-4 text-red-500" />
            </Button>
          </div>
        </>
      )}
    </li>
  );
}
