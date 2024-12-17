import React, { useState } from "react";
import Logo from "../../../img/logo.png";
import "./Form.css"; 

interface FormState {
  email: string;
  password: string;
}

const Form: React.FC = () => {
  const [formState, setFormState] = useState<FormState>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Dados enviados:", formState);
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
            value={formState.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Digite sua senha"
            value={formState.password}
            onChange={handleChange}
            required
          />
        </div>
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
