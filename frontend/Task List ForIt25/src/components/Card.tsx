import React, { useState, useEffect } from "react";
import type { CardProps, Task } from "../types/components";

const TaskCard: React.FC<CardProps> = ({ taskId }) => {
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTask = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:2010/api/tasks/${taskId}`
        );
        if (!response.ok) {
          throw new Error(`Error fetching task: ${response.status}`);
        }
        const result = await response.json();
        const task = result.task;
        setTask(task);
        setError(null);
      } catch (err: Error) {
        setError(err.message || "Error fetching task");
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [taskId]);

  if (loading) {
    return <section>Cargando tarea...</section>;
  }

  if (error) {
    return <section>Error: {error}</section>;
  }

  if (!task) {
    return <div>No se encontró la tarea.</div>;
  }

  return (
    <section className="card">
      <h3>{task.title}</h3>
      <p>ID: {task.id}</p>
      <p>Descripción: {task.description}</p>
      <p>Completada: {task.completed ? "Sí" : "No"}</p>
    </section>
  );
};

export default TaskCard;
