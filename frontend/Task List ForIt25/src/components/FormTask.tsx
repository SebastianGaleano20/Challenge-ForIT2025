import "../styles/form.css";
import { useState } from "react";
import type { FormEvent } from "react";
import type { FormData } from "../types/components";
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";
import { validateTask } from "../utils/validateTask";

export default function FormTask() {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTextareaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const errorMessage = validateTask(formData.title, formData.description);
    if (errorMessage) {
      setModalMessage(`❌ ${errorMessage}`);
      setModalOpen(true);
      return;
    }

    try {
      const response = await fetch("http://localhost:2010/api/tasks/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      setModalMessage("✅ Tarea creada exitosamente.");
      setModalOpen(true);
      setFormData({ title: "", description: "" });
      setTimeout(() => {
        setModalOpen(false);
        navigate("/tasks");
      }, 2000);
    } catch (error) {
      setModalMessage("❌ Ocurrió un error al crear la tarea.");
      setModalOpen(true);
      throw new Error(`Error: ${error}`);
    }
  };

  return (
    <section className="form-container">
      <form id="form" onSubmit={handleSubmit} target="_blank" method="post">
        <label id="title" htmlFor="title">
          Título:
        </label>
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Ingrese el título de la tarea por favor"
          required
          value={formData.title}
          onChange={handleInputChange}
        />
        <label id="description" htmlFor="description">
          Datos de la tarea:
        </label>
        <textarea
          name="description"
          id="description"
          rows={8}
          placeholder="Ingrese la descripción de la tarea por favor"
          required
          value={formData.description}
          onChange={handleTextareaChange}
        ></textarea>
        <button type="submit" value="Enviar Datos">
          Crear tarea
        </button>
      </form>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <p>{modalMessage}</p>
      </Modal>
    </section>
  );
}
