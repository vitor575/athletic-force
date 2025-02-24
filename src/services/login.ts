import axios from "axios";
import Cookies from 'js-cookie';

const api = axios.create({
    baseURL: 'https://athletic-force.onrender.com/',
    timeout: 5000,
    headers: { 'Content-Type': 'application/json' }
  });

export const login = async (email: string, password: string) => {
    try{
        
        const response = await api.post("auth/login", {email, password});
        const token = response.data;
        Cookies.set('token', token, { expires: 7, path: '/' });

    } catch (e) {
        console.log(e);
    }
};

export const cadastrarCliente = async (name: string ,email: string, password: string, cpf: string, cellphone: string) => {
    try {
        const response = await api.post("auth/client/signup ", {name, email, password, cpf, cellphone});
        if (response) {
            return "Usuário cadastrado com sucesso !!"
        }
    } catch (e) {
        console.log(e);
    }
};

export const cadastrarFuncionario = async (name: string ,email: string, password: string, cpf: string, cellphone: string, isProfessor: boolean) => {
    try {
        const response = await api.post("auth/employee/signup", {name, email, password, cpf, cellphone, isProfessor});
        if(response) {
            return "Funcionário cadastrado com sucesso !!"
        }

    } catch (e) {
        console.log(e);
    }
};