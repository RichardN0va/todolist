'use client'
import { Task } from "@/generated/prisma/client";
import { useEffect, useState } from "react";


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
    <div className="flex flex-col flex-1 justify-top items-center font-sans">
      <div>
        <h1>List</h1>
      </div>
      <div>
        <input value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleAddItem()} placeholder="Enter item..." />
        <button onClick={handleAddItem}>submit</button>
      </div>
      <div>
        <ul>
          {tasks.map((item) =>
            <li key={item.id}>{item.title}
              <button onClick={() => toggleItem(item.id, item.completed)}>
                {item.completed ? 'Undo' : 'Complete'}
              </button>
              <button onClick={() => deleteItem(item.id)}>Delete</button>
            </li>
          )}

        </ul>

      </div>
    </div>
  );
}
