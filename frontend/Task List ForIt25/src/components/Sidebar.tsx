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
            <Link to="/tasks">Lista de Tareas</Link>
          </li>
          <li>
            <Link to="/create">Crear Tarea</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
