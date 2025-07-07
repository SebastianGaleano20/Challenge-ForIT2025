import { useState, useEffect } from "react";
import Modal from "../components/Modal";
import type { Task, CardProps } from "../types/components";
import "../styles/cardTask.css";

const TaskCard: React.FC<CardProps> = ({ taskId, onDelete, onEdit }) => {
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

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
        setTask(result.task);
        setError(null);
      } catch (err: any) {
        setError(err.message || "Error fetching task");
        setModalMessage(`❌ Error al eliminar tarea.${err.message}`);
        setModalOpen(true);
      } finally {
        setLoading(false);
      }
    };
    fetchTask();
  }, [taskId]);

  if (loading)
    return <section className="card loading">Cargando tarea...</section>;
  if (error) return <section className="card error">Error: {error}</section>;
  if (!task)
    return <div className="card no-task">No se encontró la tarea.</div>;

  return (
    <section className="card">
      <h3>{task.title}</h3>
      <p>ID: {task.id}</p>
      <p>Descripción: {task.description}</p>
      <p>Completada: {task.completed ? "Sí" : "No"}</p>

      <section className="card-menu">
        <button onClick={onEdit} aria-label="Editar tarea">
          ✏️ Editar
        </button>
        <button onClick={onDelete} aria-label="Eliminar tarea">
          🗑️ Eliminar
        </button>
      </section>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <p>{modalMessage}</p>
      </Modal>
    </section>
  );
};

export default TaskCard;
