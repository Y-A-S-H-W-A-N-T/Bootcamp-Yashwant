// src/pages/index.tsx

import { type NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { api } from "~/utils/api";
import type { CreateTask } from "~/schemas/task";

const Home: NextPage = () => {
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const [error, setError] = useState<string>("");
  const utils = api.useUtils();

  const { data: tasks, isLoading } = api.task.getAll.useQuery();
  const createTask: any = api.task.create.useMutation({
    onSuccess: () => {
      setNewTask({ title: "", description: "" });
      setError("");
      void utils.task.getAll.invalidate();
    },
    onError: (e) => {
      setError(e.message);
    },
  });

  const updateTask = api.task.update.useMutation({
    onSuccess: () => void utils.task.getAll.invalidate(),
  });

  const deleteTask = api.task.delete.useMutation({
    onSuccess: () => void utils.task.getAll.invalidate(),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    createTask.mutate(newTask);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <Head>
        <title>T3 CRUD App</title>
        <meta name="description" content="Simple CRUD app with T3 Stack" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container mx-auto p-4">
        <h1 className="mb-4 text-4xl font-bold">Task Manager</h1>
        
        <form onSubmit={handleSubmit} className="mb-8">
          {error && <div className="mb-4 text-red-500">{error}</div>}
          <input
            type="text"
            placeholder="Task title"
            className="mr-2 rounded border p-2"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          />
          <input
            type="text"
            placeholder="Description (optional)"
            className="mr-2 rounded border p-2"
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          />
          <button
            type="submit"
            className="rounded bg-blue-500 px-4 py-2 text-white disabled:bg-gray-400"
            disabled={createTask.isLoading}
          >
            {createTask.isLoading ? "Adding..." : "Add Task"}
          </button>
        </form>

        <div className="space-y-4">
          {tasks?.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between rounded border p-4"
            >
              <div>
                <h3 className="text-xl font-semibold">{task.title}</h3>
                {task.description && <p className="text-gray-600">{task.description}</p>}
              </div>
              <div className="space-x-2">
                <button
                  onClick={() =>
                    updateTask.mutate({
                      id: task.id,
                      completed: !task.completed,
                    })
                  }
                  className={`rounded px-4 py-2 text-white ${
                    task.completed ? "bg-green-500" : "bg-gray-500"
                  }`}
                >
                  {task.completed ? "Completed" : "Mark Complete"}
                </button>
                <button
                  onClick={() => deleteTask.mutate({ id: task.id })}
                  className="rounded bg-red-500 px-4 py-2 text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default Home;