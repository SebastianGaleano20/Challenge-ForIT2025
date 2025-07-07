import { useEffect, useState } from "react";
import type { Task } from "../types/components";

export default function ListTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:2010/api/tasks");
        if (!response.ok) {
          throw new Error(`Error fetching tasks: ${response.status}`);
        }
        const result = await response.json();
        const tasks = result.tasks;
        setTasks(tasks);
        setError(null);
      } catch (err: Error) {
        setError(err.message || "Error fetching tasks");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (loading) {
    return <div>Cargando tareas...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <section>
      <h1>Lista de tareas</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </section>
  );
}
