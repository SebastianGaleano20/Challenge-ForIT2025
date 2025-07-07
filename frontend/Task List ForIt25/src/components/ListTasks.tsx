import { useEffect, useState } from "react";
import type { Task } from "../types/components";
import "../styles/listTasks.css";
import Modal from "./Modal";
import CardTask from "./CardTask";

export default function ListTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:2010/api/tasks");
      if (!response.ok)
        throw new Error(`Error fetching tasks: ${response.status}`);
      const result = await response.json();
      setTasks(result.tasks);
      setError(null);
      setModalMessage("✅ Tareas cargadas exitosamente.");
      setModalOpen(true);
    } catch (err: Error) {
      setError(err.message || "Error fetching tasks");
      setModalMessage(`❌ Error al cargar las tareas.${err.message}`);
      setModalOpen(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Función para eliminar tarea
  const handleDelete = async (taskId: number) => {
    try {
      const response = await fetch(
        `http://localhost:2010/api/tasks/${taskId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok)
        throw new Error(`Error eliminando tarea: ${response.status}`);
      setModalMessage("✅ Tarea eliminada exitosamente.");
      setModalOpen(true);
      fetchTasks(); // refrescar lista
    } catch (err: Error) {
      setModalMessage(`❌ Error al eliminar tarea.${err.message}`);
      setModalOpen(true);
    }
  };

  // Función para editar tarea: solo abrimos la CardTask con id, por ejemplo.
  const handleEdit = (taskId: number) => {
    console.log("Editar tarea:", taskId);
  };

  if (loading) return <div>Cargando tareas...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <section className="list-tasks">
      <h1>Lista de tareas</h1>
      <div className="cards-container">
        {tasks.map((task) => (
          <CardTask
            key={task.id}
            taskId={task.id}
            onDelete={() => handleDelete(task.id)}
            onEdit={() => handleEdit(task.id)}
          />
        ))}
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <p>{modalMessage}</p>
      </Modal>
    </section>
  );
}
