import React from "react";
import Navbar from "./components/NavBar/NavBar"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Sobre from './pages/Sobre';
import Treino from './pages/Treino';
import Modalidades from './pages/Modalidade';
import Login from './pages/Login';
import Contato from "./pages/Contato";


function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <main>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/treino" element={<Treino />} />
            <Route path="/modalidades" element={<Modalidades />} />
            <Route path="/contato" element={<Contato />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
