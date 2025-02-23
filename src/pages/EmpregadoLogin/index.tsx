import Form from "../../components/Form";
import "./EmpregadoLogin.css";

const EmpregadoLogin = () => {
  return (
    <main className="empregado__login">
      <div className="login__form__container">
          <div className="login__img">
            
          </div>
          <div className="login__form">
            <Form
              titulo="Faça login"
              label1="Email"
              label2="Senha"
              botao="Login"
              type="email"
            />
          </div>
      </div>
    </main>
  );
};

export default EmpregadoLogin;
