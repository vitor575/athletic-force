import React, { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ProtectedRoute from "./components/protectedRoute";

const Home = lazy(() => import("./pages/Home"));
const CronogramaTreino = lazy(() => import("./components/PagesAlunos/index"));
const Login = lazy(() => import("./components/Login"));
const ConfigClientPage = lazy(
  () => import("./components/PagesAlunos/ConfigClientPage"),
);
const EmpregadoDashboard = lazy(() => import("./pages/EmpregadoDashboard"));
const DashboardAdminRoutines = lazy(
  () => import("./components/Dashboard/DashboardAdminRoutines"),
);
const DashboardAdmin = lazy(
  () => import("./components/Dashboard/DashboardAdminUser"),
);
const DashboardAdminExercise = lazy(
  () => import("./components/Dashboard/DashboardAdminExercise"),
);
const DashboardAdminTrainings = lazy(
  () => import("./components/Dashboard/DashboardAdminTrainings"),
);
const SelectedStudent = lazy(
  () => import("./components/Dashboard/DashboardStudent/SelectedStudent"),
);
const DashboardStudent = lazy(
  () => import("./components/Dashboard/DashboardStudent"),
);

const LoadingFallback = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      fontSize: "1.2rem",
      color: "#666",
    }}
  >
    Carregando...
  </div>
);

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <main>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              {/* Rotas públicas */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />

              {/* Rotas protegidas */}
              <Route element={<ProtectedRoute redirectPath="/" />}>
                {/* Área do cliente */}
                <Route
                  path="/clientHome"
                  element={<Navigate to="/clientHome/cronograma" replace />}
                />
                <Route
                  path="/clientHome/configuration"
                  element={<ConfigClientPage />}
                />
                <Route
                  path="/clientHome/cronograma"
                  element={<CronogramaTreino />}
                />

                {/* Área do funcionário/admin */}
                <Route
                  path="/EmpregadoDashboard"
                  element={<EmpregadoDashboard />}
                >
                  <Route index element={<DashboardStudent />} />
                  <Route
                    path="DashboardAdminUser"
                    element={<DashboardAdmin />}
                  />
                  <Route path="treinos/:id" element={<SelectedStudent />} />
                  <Route
                    path="DashboardAdminExercise"
                    element={<DashboardAdminExercise />}
                  />
                  <Route
                    path="DashboardAdminTrainings"
                    element={<DashboardAdminTrainings />}
                  />
                  <Route
                    path="DashboardAdminRoutines"
                    element={<DashboardAdminRoutines />}
                  />
                </Route>
              </Route>
            </Routes>
          </Suspense>
        </main>
      </Router>
    </div>
  );
};

export default App;
