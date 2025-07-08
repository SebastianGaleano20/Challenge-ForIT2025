import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Modal from "./Modal";
import type { Task } from "../types/components";

export default function EditTask() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState<Task | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await fetch(`http://localhost:2010/api/tasks/${id}`);
        const data = await res.json();
        setTask(data.task);
      } catch {
        setModalMessage("❌ Error al cargar la tarea");
        setModalOpen(true);
      }
    };
    fetchTask();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!task) return;
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const toggleCompleted = () => {
    if (!task) return;
    setTask({ ...task, completed: !task.completed });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!task) return;

    try {
      const res = await fetch(`http://localhost:2010/api/tasks/edit/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      });
      if (!res.ok) throw new Error();

      setModalMessage("✅ Tarea actualizada");
      setModalOpen(true);
      setTimeout(() => {
        setModalOpen(false);
        navigate("/");
      }, 2000);
    } catch {
      setModalMessage("❌ Error al guardar");
      setModalOpen(true);
    }
  };

  if (!task) return <section>Cargando tarea...</section>;

  return (
    <section className="form-container">
      <h2>Editar tarea #{task.id}</h2>
      <form onSubmit={handleSubmit}>
        <label>Título:</label>
        <input
          type="text"
          name="title"
          value={task.title}
          onChange={handleChange}
          required
        />

        <label>Descripción:</label>
        <textarea
          name="description"
          value={task.description}
          onChange={handleChange}
          rows={5}
          required
        />

        <label>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={toggleCompleted}
          />
          Marcar como completada
        </label>

        <button type="submit">Guardar</button>
      </form>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <p>{modalMessage}</p>
      </Modal>
    </section>
  );
}
