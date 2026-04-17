'use client'
import { Task } from "@/generated/prisma/client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

export default function Home() {

  const [tasks, setTasks] = useState<Task[]>([])
  const [inputValue, setInputValue] = useState("")

  useEffect(() => {
    fetch('/api/tasks')
      .then(r => r.json())
      .then(data => {
        setTasks(data)
      })
  }, [])

  const handleAddItem = async () => {
    if (inputValue.trim() === "") return
    const res = await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: inputValue })
    })
    const task = await res.json()
    setTasks([task, ...tasks])
    setInputValue("")
  }

  const toggleItem = async (id: string, completed: boolean) => {
    await fetch(`/api/tasks/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !completed })
    })
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !completed } : t))


  }
  const deleteItem = async (id: string) => {
    await fetch(`/api/tasks/${id}`, { method: 'DELETE' })
    setTasks(tasks.filter(t => t.id !== id))
  }
  return (
    <Card className="min-h-screen bg-gray-950 text-gray-100 flex flex-col items-center py-16 px-4">
      <div className="w-full max-w-md space-y-6 justify-center items-center flex">
        <h1 className="text-2xl font-semibold tracking-tight">List</h1>
      </div>
      <div className="flex gap-2">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleAddItem()}
          placeholder="Enter item..."
          className="bg-gray-900 border-gray-800 text-gray-100 placeholder:text-gray-500" />
        <Button onClick={handleAddItem} className="bg-white text-gray-950 hover:bg-gray-200">submit</Button>
      </div>

      <ul className="space-y-2">
        {tasks.map((item) =>
          <li key={item.id} className="flex items-center gap-3 bg-gray-900 border border-gray-800 rounded-lg px-4 py-3">
            <Checkbox checked={item.completed} onCheckedChange={() => toggleItem(item.id, item.completed)} className="">
              {item.completed ? 'Undo' : 'Complete'}
            </Checkbox>
            <span className={`flex-1 text-sm ${item.completed ? 'line-through text-gray-500' : 'text-gray-100'}`}>{item.title}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => deleteItem(item.id)}
              className="text-gray-500 hover:text-red-400 hover:bg-transparent">
              Delete
            </Button>
          </li>
        )}

      </ul>
    </Card>
  );
}
