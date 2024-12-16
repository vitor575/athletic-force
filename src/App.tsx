import React from "react";
import Navbar from "./components/NavBar.tsx";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home.tsx';
import Sobre from './components/pages/Sobre.tsx';
import Treino from './components/pages/Treino.tsx';
import Modalidades from './components/pages/Modalidade.tsx';
import Contato from './components/pages/Contato.tsx';
import "./styles.css";

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
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
