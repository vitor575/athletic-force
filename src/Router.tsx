import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./components/Login";
import ClientHome from "./pages/ClientHome/indes";
import Pagamento from "./pages/Pagamento";
import CronogramaTreino from "./pages/CronogramaTreino";
import Treino from "./components/Treino";
import ConfigClientPage from "./pages/ConfigClientPage";
import ProtectedRoute from "./components/protectedRoute";
import EmpregadoDashboard from "./pages/EmpregadoDashboard";
import DashboardAlunos from "./components/Dashboard/DashboardAlunos";
import DashboardTreinos from "./components/Dashboard/DashboardRotinas";
import DashboardAdmin from "./components/Dashboard/DashboardAdminUser";
import DashboardAdminExercise from "./components/Dashboard/DashboardAdminExercise";
import DashboardAdminTrainings from "./components/Dashboard/DashboardAdminTrainings";

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
   
            <Route element={<ProtectedRoute redirectPath="/login" />}>
              
              <Route path="/clientHome" element={<ClientHome />} />
              <Route path="/clientHome/pagamentos" element={<Pagamento />} />
              <Route path="/clientHome/configuration" element={<ConfigClientPage />}/>
              <Route
                path="/clientHome/cronograma"
                element={<CronogramaTreino />}
              >
                <Route
                  path="/clientHome/cronograma/:dia"
                  element={<Treino />}
                />
              </Route>

              <Route
                path="/EmpregadoDashboard"
                element={<EmpregadoDashboard />}
              >
                <Route
                  index
                  element={<DashboardAlunos />}
                />
                <Route
                  path="/EmpregadoDashboard/DashboardAdminUser"
                  element={<DashboardAdmin />}
                />
                <Route
                  path="/EmpregadoDashboard/DashboardAdminExercise"
                  element={<DashboardAdminExercise />}
                />

                <Route
                  path="/EmpregadoDashboard/DashboardAdminTrainings"
                  element={<DashboardAdminTrainings />}
                />          
                <Route
                  path="/EmpregadoDashboard/treinos/:id"
                  element={<DashboardTreinos />}
                />
              </Route>
            </Route>
          </Routes>
        </main>
      </Router>
    </div>
  );
};

export default App;
