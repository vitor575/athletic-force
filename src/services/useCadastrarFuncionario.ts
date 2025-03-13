import axios from "axios";

const api = axios.create({
    baseURL: 'https://athletic-force.onrender.com/',
    timeout: 5000,
    headers: { 'Content-Type': 'application/json' }
  });