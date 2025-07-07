import { useEffect, useState } from "react";
import type { Task } from "../types/components";
import "../styles/listTasks.css";
import Modal from "./Modal";

export default function ListTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

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
        setModalMessage("✅ Tareas cargadas exitosamente.");
        setModalOpen(true);
      } catch (err: Error) {
        setError(err.message || "Error fetching tasks");
        setModalMessage("❌ Ocurrió un error al cargar las tareas.");
        setModalOpen(true);
        throw new Error(`Error: ${err}`);
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
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <p>{modalMessage}</p>
      </Modal>
    </section>
  );
}
