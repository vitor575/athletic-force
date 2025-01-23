import "./Form.css";

const FormPassword = () => {
  return (
    <form className="form-container">
      <h2 className="form-title">Alterar Senha</h2>
      <label htmlFor="password" className="form-label">Nova Senha:</label>
      <input 
        type="password" 
        id="password" 
        name="password" 
        placeholder="Digite sua nova senha" 
        className="form-input" 
      />
      <label htmlFor="confirm-password" className="form-label">Confirmar Senha:</label>
      <input 
        type="password" 
        id="confirm-password" 
        name="confirm-password" 
        placeholder="Confirme sua nova senha" 
        className="form-input" 
      />
      <button type="submit" className="form-button">Salvar</button>
    </form>
  );
};

export default FormPassword;
