import { useState, useEffect } from "react";
import type { CardProps, Task } from "../types/components";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import "../styles/cardTask.css";

const TaskCard: React.FC<CardProps> = ({ taskId, onDelete }) => {
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const navigate = useNavigate();

  const fetchTask = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:2010/api/tasks/${taskId}`);
      if (!response.ok)
        throw new Error(`Error fetching task: ${response.status}`);
      const result = await response.json();
      setTask(result.task);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Error fetching task");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTask();
  }, [taskId]);

  const handleCompletedToggle = async () => {
    try {
      const response = await fetch(
        `http://localhost:2010/api/tasks/edit/${taskId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ completed: !task?.completed }),
        }
      );

      if (!response.ok)
        throw new Error(`Error al actualizar tarea: ${response.status}`);

      await fetchTask();

      setModalMessage("✅ Tarea realizada");
      setModalOpen(true);
    } catch (error) {
      console.error("Error al cambiar el estado:", error);
      setModalMessage("❌ Error al actualizar tarea.");
      setModalOpen(true);
    }
  };

  if (loading) return <section>Cargando tarea...</section>;
  if (error) return <section>Error: {error}</section>;
  if (!task) return <section>No se encontró la tarea.</section>;

  return (
    <>
      <section className={`card ${task.completed ? "completed" : ""}`}>
        <section className="card-header">
          <h3>{task.title}</h3>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={handleCompletedToggle}
          />
        </section>
        <p>ID: {task.id}</p>
        <p>Descripción: {task.description}</p>
        <section className="card-menu">
          <button onClick={() => navigate(`/edit/${task.id}`)}>
            ✏️ Editar
          </button>
          <button onClick={() => onDelete(task.id)}>🗑️ Eliminar</button>
        </section>
      </section>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <p>{modalMessage}</p>
      </Modal>
    </>
  );
};

export default TaskCard;
