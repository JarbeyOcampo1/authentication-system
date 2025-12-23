import { useState } from "react";
import { login } from "../api/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const data = await login(email, password);
        console.log("LOGIN OK:", data);   // 🔴 OBLIGATORIO

        localStorage.setItem("token", data.token);
        localStorage.setItem("rol", data.rol);

        navigate("/home", { replace: true });
    } catch (err) {
        console.error("ERROR LOGIN:", err);
        alert("Login fallido");
    }
};  

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <button>Entrar</button>
    </form>
  );
}
