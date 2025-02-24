import React from "react";
import Navbar from "./components/NavBar/NavBar";
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
import DashboardAlunos from "./components/DashboardAlunos";
import DashboardHome from "./components/DashboardHome";
import DashboardTreinos from "./components/DashboardTreinos";

const App: React.FC = () => {

  return (
      <div className="App">
        <Router>
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/EmpregadoDashboard"
                element={<EmpregadoDashboard />}
              >
                <Route index element={<DashboardHome />}/>
                <Route path="/EmpregadoDashboard/Alunos" element={<DashboardAlunos />} />
                <Route path="/EmpregadoDashboard/Alunos/treinos" element={<DashboardTreinos />} />
              </Route>
              <Route element={<ProtectedRoute redirectPath="/login" />}>
                <Route path="/clientHome" element={<ClientHome />} />
                <Route path="/clientHome/pagamentos" element={<Pagamento />} />
                <Route
                  path="/clientHome/configuration"
                  element={<ConfigClientPage />}
                />
                <Route
                  path="/clientHome/cronograma"
                  element={<CronogramaTreino />}
                >
                  <Route
                    path="/clientHome/cronograma/:dia"
                    element={<Treino />}
                  />
                </Route>
              </Route>
            </Routes>
          </main>
        </Router>
      </div>
  );
}

export default App;
