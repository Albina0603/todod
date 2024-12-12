import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";

interface TaskFormProps {
  onAddTask: (text: string) => void;
}

export default function TaskForm({ onAddTask }: TaskFormProps) {
  const [newTask, setNewTask] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.trim()) {
      onAddTask(newTask);
      setNewTask("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex mb-4">
      <Input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Add a new task"
        className="flex-grow mr-2"
      />
      <Button type="submit" className="flex items-center">
        <Plus className="w-4 h-4 mr-2" />
        Add
      </Button>
    </form>
  );
}
