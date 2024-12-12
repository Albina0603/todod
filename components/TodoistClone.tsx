"use client";

import { useState } from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";

import { todoType } from "@/types/todoType";

import {
  addTodo,
  deleteTodo,
  editTodo,
  toggleTodo,
} from "@/actions/todoAction";

interface Props {
  todos: todoType[];
}

export default function TodoistClone({ todos }: Props) {
  const [tasks, setTasks] = useState<todoType[]>(todos);

  const addTask = (text: string) => {
    const id = (tasks.at(-1)?.id || 0) + 1;
    setTasks([...tasks, { id: id, text, completed: false, isEditing: false }]);
    addTodo(id, text);
  };

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
    toggleTodo(id);
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
    deleteTodo(id);
  };

  const editTask = (id: number, newText: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, text: newText, isEditing: false } : task
      )
    );
    editTodo(id, newText);
  };

  const startEditing = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, isEditing: true } : task
      )
    );
  };

  const cancelEditing = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, isEditing: false } : task
      )
    );
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Todoist Clone</h1>
      <TaskForm onAddTask={addTask} />
      <TaskList
        tasks={tasks}
        onToggleTask={toggleTask}
        onDeleteTask={deleteTask}
        onEditTask={editTask}
        onStartEditing={startEditing}
        onCancelEditing={cancelEditing}
      />
    </div>
  );
}
