import "../styles/form.css";
export default function Form() {
  return (
    <section className="form-container">
      <form id="form" target="_blank" method="post">
        <label id="title" htmlFor="title">
          Título:
        </label>
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Ingrese el título de la tarea por favor"
          required
        />
        <label id="data" htmlFor="data">
          Datos de la tarea:
        </label>
        <textarea
          className="data"
          name="data"
          id="data"
          rows={8}
          placeholder="Ingrese la descripción de la tarea por favor"
          required
        ></textarea>
        <button type="submit" value="Enviar Datos">
          Crear tarea
        </button>
      </form>
    </section>
  );
}
