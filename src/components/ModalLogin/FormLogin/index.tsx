import React, { useState } from "react";
import Logo from "../../../img/logo.png";
import "./Form.css"; 
import { login } from "../../../services/authentication";
import { useNavigate } from "react-router-dom";
import { ImSpinner8 } from "react-icons/im";

const Form: React.FC = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try{
      if(email && senha) {
        await login(email, senha);
        navigate("/clientHome");
        return
      }else {
        setError("Email e senha são obrigatórios.");
      }
    }catch (e) {
      console.log(e);
    }finally {
      setLoading(false);
    }
  
  };

  
  return (
    <div className="container">
      <div className="container__img">
        <img src={Logo} alt="Logo"/>
      </div>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Digite sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </div>

        {error && (
          <p>{error}</p>
        )}

        {loading && <div className="spinner-container"><ImSpinner8 className="spinner"/></div>}

        <div className="submit-container">
          <button type="submit" className="submit-button">
            Continuar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;