import "../styles/form.css";
import { useState } from "react";
import type { FormEvent } from "react";
import type { FormData } from "../types/components";

export default function FormTask() {
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
      const data = await response.json();
      console.log("Éxito:", data);
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
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
    </section>
  );
}
