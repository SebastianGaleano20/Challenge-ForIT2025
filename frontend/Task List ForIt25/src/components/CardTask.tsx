import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import type { CardProps, Task } from "../types/components";
import "../styles/cardTask.css";

const TaskCard: React.FC<CardProps> = ({ taskId, onDelete }) => {
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:2010/api/tasks/${taskId}`
        );
        if (!response.ok)
          throw new Error(`Error fetching task: ${response.status}`);
        const result = await response.json();
        setTask(result.task);
        setError(null);
        setLoading(false);
        setModalOpen(false);
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

  const handleToggleCompleted = async () => {
    if (!task) return;

    try {
      const response = await fetch(
        `http://localhost:2010/api/tasks/edit/${taskId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ completed: !task.completed }),
        }
      );
      if (!response.ok) throw new Error();

      const updated = await response.json();
      setTask(updated.task);
      setModalMessage("✅ Tarea realizada");
      setModalOpen(true);
    } catch (err: any) {
      setModalMessage(`❌ Error al completar tarea.${err.message}`);
      setModalOpen(true);
    }
  };

  const handleEdit = () => {
    navigate(`/tasks/edit/${taskId}`);
  };

  if (loading) return <section className="card loading">Cargando...</section>;
  if (error) return <section className="card error">Error: {error}</section>;
  if (!task) return null;

  return (
    <section className={`card ${task.completed ? "completed" : ""}`}>
      <section className="card-header">
        <h3>{task.title}</h3>
        <button onClick={handleToggleCompleted} title="Marcar como completada">
          {task.completed ? "✅" : "☑️"}
        </button>
      </section>

      <p>ID: {task.id}</p>
      <p>{task.description}</p>

      <section className="card-menu">
        <button onClick={handleEdit}>✏️ Editar</button>
        <button onClick={onDelete}>🗑️ Eliminar</button>
      </section>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <p>{modalMessage}</p>
      </Modal>
    </section>
  );
};

export default TaskCard;
