import React from "react";
import Navbar from "./components/NavBar/NavBar"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Sobre from './pages/Sobre';
import Modalidades from './pages/Modalidade';
import Login from './pages/Login';
import Contato from "./pages/Contato";
import ClientHome from "./pages/ClientHome/indes";



function App() {

  return (
    <div className="App">
      <Router>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sobre" element={<Sobre />} />
            
            <Route path="/modalidades" element={<Modalidades />} />
            <Route path="/contato" element={<Contato />} />
            <Route path="/login" element={<Login />} />
            <Route path="/clientHome" element={<ClientHome />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
