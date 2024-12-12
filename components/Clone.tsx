'use client'

import { useState } from 'react'
import { Trash2, Check, Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Task {
  id: number
  text: string
  completed: boolean
}

export default function TodoistClone() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTask, setNewTask] = useState('')

  const addTask = (e: React.FormEvent) => {
    e.preventDefault()
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), text: newTask.trim(), completed: false }])
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
            className={`flex items-center justify-between p-2 rounded 
            ${task.completed ? 'bg-green-100' : 'bg-gray-100'}`}
          >
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
                onClick={() => deleteTask(task.id)}
                variant="outline"
                size="icon"
                aria-label="Delete task"
              >
                <Trash2 className="w-4 h-4 text-red-500" />
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}