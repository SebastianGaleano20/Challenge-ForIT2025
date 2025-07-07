import { Link } from "react-router-dom";
import "../styles/sidebar.css";

type Props = {
  isOpen: boolean;
};

export default function Sidebar({ isOpen }: Props) {
  return (
    <aside className={`sidebar ${isOpen ? "open" : ""}`}>
      <h2>Dashboard</h2>
      <nav>
        <ul>
          <li>
            <Link to="/tareas">Lista de Tareas</Link>
          </li>
          <li>
            <Link to="/crear">Crear Tarea</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
