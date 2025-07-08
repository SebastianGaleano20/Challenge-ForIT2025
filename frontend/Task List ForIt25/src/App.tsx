import { Routes, Route } from "react-router-dom";
import DashboardLayout from "./layout/Dashboard";
import ListTask from "./components/ListTasks";
import FormTask from "./components/FormTask";
import EditTask from "./components/EditTask";

function App() {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route path="tasks" element={<ListTask />} />
        <Route path="create" element={<FormTask />} />
        <Route path="/edit/:id" element={<EditTask />} />
      </Route>
    </Routes>
  );
}

export default App;
