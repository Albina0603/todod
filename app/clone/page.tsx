'use client'

import { useState } from 'react'
import { Trash2, Check, Plus, Edit } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Task {
  id: number
  text: string
  completed: boolean
  isEditing: boolean
}

export default function TodoistClone() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTask, setNewTask] = useState('')

  const addTask = (e: React.FormEvent) => {
    e.preventDefault()
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), text: newTask.trim(), completed: false, isEditing: false }])
      setNewTask('')
    }
  }

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const editTask = (id: number, newText: string) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, text: newText, isEditing: false } : task
    ))
  }

  const startEditing = (id: number) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, isEditing: true } : task
    ))
  }

  const cancelEditing = (id: number) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, isEditing: false } : task
    ))
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Todoist Clone</h1>
      <form onSubmit={addTask} className="flex mb-4">
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
      <ul className="space-y-2">
        {tasks.map(task => (
          <li 
            key={task.id} 
            className={`flex items-center justify-between p-2 rounded ${
              task.completed ? 'bg-green-100' : 'bg-gray-100'
            }`}
          >
            {task.isEditing ? (
              <div className="flex items-center">
                <Input
                  type="text"
                  value={task.text}
                  onChange={(e) => {
                    setTasks(tasks.map(t =>
                      t.id === task.id ? { ...t, text: e.target.value } : t
                    ))
                  }}
                  className="mr-2"
                />
                <Button
                  onClick={() => editTask(task.id, task.text)}
                  variant="outline"
                  size="icon"
                  aria-label="Save changes"
                >
                  <Check className="w-4 h-4 text-green-500" />
                </Button>
                <Button
                  onClick={() => cancelEditing(task.id)}
                  variant="outline"
                  size="icon"
                  aria-label="Cancel editing"
                >
                  <Trash2 className="w-4 h-4 text-gray-500" />
                </Button>
              </div>
            ) : (
              <>
                <span className={task.completed ? 'line-through text-gray-500' : 'text-gray-800'}>
                  {task.text}
                </span>
                <div>
                  <Button
                    onClick={() => toggleTask(task.id)}
                    className="mr-2"
                    variant="outline"
                    size="icon"
                    aria-label={task.completed ? "Mark as incomplete" : "Mark as complete"}
                  >
                    <Check className={`w-4 h-4 ${task.completed ? 'text-green-500' : 'text-gray-500'}`} />
                  </Button>
                  <Button
                    onClick={() => startEditing(task.id)}
                    variant="outline"
                    size="icon"
                    aria-label="Edit task"
                  >
                    <Edit className="w-4 h-4 text-blue-500" />
                  </Button>
                  <Button
                    onClick={() => deleteTask(task.id)}
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
        ))}
      </ul>
    </div>
  )
}
