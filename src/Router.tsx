import React from "react";
import Navbar from "./components/NavBar/NavBar"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './components/Login';
import ClientHome from "./pages/ClientHome/indes";
import Pagamento from "./pages/Pagamento";
import CronogramaTreino from "./pages/CronogramaTreino";
import Treino from "./components/Treino";
import ConfigClientPage from "./pages/ConfigClientPage";

function App() {

  return (
    <div className="App">
      <Router>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/clientHome" element={<ClientHome />} />
            <Route path="/clientHome/pagamentos" element={<Pagamento />} />
            <Route path="/clientHome/configuration" element={<ConfigClientPage />}/> 
            <Route path="/clientHome/cronograma" element={<CronogramaTreino />} >
              <Route path="/clientHome/cronograma/:dia" element={<Treino />} />
            </Route>
            
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
