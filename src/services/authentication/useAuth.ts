import { useState } from "react";
import { login } from "../login";
import { useClientData } from "../GetData/useClientData";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const [loginError, setLoginError] = useState("");
  const { refetch } = useClientData();
  const navigate = useNavigate();

  const authenticate = async (email: string, senha: string) => {
    if (!email || !senha) {
      setLoginError("Email e senha são obrigatórios.");
      return;
    }
    try {
      await login(email, senha);
      const { data } = await refetch();
      console.log("Dados retornados da query 'me':", data);
      if (data && data.me) {
        const user = data.me;
        if (user.role === 'Employee' || user.role === 'Professor' || user.role === 'Admin') {
          navigate('/EmpregadoDashboard');
        } else if (user.role === 'Student') {
          navigate("/clientHome");
        }
      }
    } catch (e: any) {
      console.error(e);
      setLoginError("Erro ao efetuar o login. Verifique suas credenciais.");
    }
  };

  return { authenticate, loginError };
};