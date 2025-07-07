import { Routes, Route } from "react-router-dom";
import DashboardLayout from "./layout/Dashboard";
import ListTask from "./components/ListTasks";
import FormTask from "./components/FormTask";
import CardTask from "./components/CardTask";

function App() {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route path="tareas" element={<ListTask />} />
        <Route path="crear" element={<FormTask />} />
        <Route path="tareas/:id" element={<CardTask taskId={0} />} />
      </Route>
    </Routes>
  );
}

export default App;
