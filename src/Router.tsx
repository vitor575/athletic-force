import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ClientHome from "./pages/ClientHome/indes";
import Pagamento from "./components/PagesAlunos/Pagamento/Pagamento";
import CronogramaTreino from "./components/PagesAlunos/index";
import Login from "./components/Login";
import ConfigClientPage from "./components/PagesAlunos/ConfigClientPage";
import ProtectedRoute from "./components/protectedRoute";
import EmpregadoDashboard from "./pages/EmpregadoDashboard";
import DashboardAdminRoutines from "./components/Dashboard/DashboardAdminRoutines";
import DashboardAdmin from "./components/Dashboard/DashboardAdminUser";
import DashboardAdminExercise from "./components/Dashboard/DashboardAdminExercise";
import DashboardAdminTrainings from "./components/Dashboard/DashboardAdminTrainings";
import SelectedStudent from "./components/Dashboard/DashboardStudent/SelectedStudent";
import DashboardStudent from "./components/Dashboard/DashboardStudent";

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <main>
          <Routes>
            {/* Rotas públicas */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />

            {/* Rotas protegidas */}
            <Route element={<ProtectedRoute redirectPath="/" />}>

              {/* Área do cliente */}
              <Route path="/clientHome" element={<ClientHome />} />
              <Route path="/clientHome/pagamentos" element={<Pagamento />} />
              <Route path="/clientHome/configuration" element={<ConfigClientPage />} />
              <Route path="/clientHome/cronograma" element={<CronogramaTreino />} />

              {/* Área do funcionário/admin */}
              <Route path="/EmpregadoDashboard" element={<EmpregadoDashboard />}>
                <Route index element={<DashboardStudent />} />
                <Route path="DashboardAdminUser" element={<DashboardAdmin />} />
                <Route path="treinos/:id" element={<SelectedStudent />} />
                <Route path="DashboardAdminExercise" element={<DashboardAdminExercise />} />
                <Route path="DashboardAdminTrainings" element={<DashboardAdminTrainings />} />
                <Route path="DashboardAdminRoutines" element={<DashboardAdminRoutines />} />
              </Route>
            </Route>
          </Routes>
        </main>
      </Router>
    </div>
  );
};

export default App;
