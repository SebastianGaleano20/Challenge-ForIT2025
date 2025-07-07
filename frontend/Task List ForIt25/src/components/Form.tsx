import "../styles/form.css";
export default function Form() {
  return (
    <section className="form-container">
      <form id="form" target="_blank" method="post">
        <label htmlFor="title">Ingrese el título de la tarea: </label>
        <input type="text" name="title" id="title" required />
        <label htmlFor="data">Datos de la tarea:</label>
        <textarea className="data" name="data" id="data" rows={8}></textarea>
        <input type="submit" value="Enviar Datos" />
      </form>
    </section>
  );
}
