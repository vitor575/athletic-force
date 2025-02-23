import "./Form.css";

interface formProps {
  titulo: string
  label1: string
  label2: string
  botao: string
  type: string
}

const FormPassword = ({titulo, label1, label2, botao, type}: formProps) => {
  return (
    <div className="div-form-container">
      <form className="form-container">
        <h2 className="form-title">{titulo}</h2>
        <div>
          <input
            type={type}
            id="password"
            name="password"
            placeholder={label1}
            className="form-input"
          />
        </div>
        <div>
          <input
            type="password"
            id="confirm-password"
            name="confirm-password"
            placeholder={label2}
            className="form-input"
          />
        </div>
        <button type="submit" className="form-button">
          {botao}
        </button>
      </form>
    </div>
  );
};

export default FormPassword;
