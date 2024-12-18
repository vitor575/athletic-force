import React from "react";
import Navbar from "./components/NavBar/NavBar"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './components/Login';
import ClientHome from "./pages/ClientHome/indes";
import Pagamento from "./pages/Pagamento";



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
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
