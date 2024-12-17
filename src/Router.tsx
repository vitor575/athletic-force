import React from "react";
import Navbar from "./components/NavBar/NavBar.tsx";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/index.tsx';
import Sobre from './pages/Sobre/index.tsx';
import Treino from './pages/Treino/index.tsx';
import Modalidades from './pages/Modalidade/index.tsx';
import Login from './pages/Login/index.tsx';


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
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
