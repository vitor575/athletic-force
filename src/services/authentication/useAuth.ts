import { useState } from "react";
import { login } from "../login";
import { useClientData } from "../querrys/useClientData";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export const useAuth = () => {
  const [loginError, setLoginError] = useState("");
  const { refetch } = useClientData();
  const navigate = useNavigate();

  const authenticate = async (email: string, senha: string) => {
    setLoginError("");
    if (!email || !senha) {
      setLoginError("Email e senha são obrigatórios.");
      return;
    }
    try {
      Cookies.remove("token");
      await login(email, senha);
      const { data } = await refetch();
      if (data && data.me) {
        const user = data.me;
        if (
          user.role === "Employee" ||
          user.role === "Professor" ||
          user.role === "Admin"
        ) {
          navigate("/EmpregadoDashboard");
        } else if (user.role === "Student") {
          navigate("/clientHome/cronograma");
        }
      } else {
        setLoginError("Falha ao obter dados do usuário.");
      }
    } catch (e: any) {
      console.error(e);
      if (e.response && e.response.status === 401) {
        setLoginError("Email ou senha inválidos.");
      } else {
        setLoginError("Erro ao efetuar o login. Tente novamente mais tarde.");
      }
      throw e;
    }
  };

  return { authenticate, loginError };
};
