import { useNavigate } from "react-router-dom";
export default function Admin() {
  const navigate = useNavigate();

const logout = () => {
  localStorage.clear();
  navigate("/login", { replace: true });
};
  return (
    <div>
      <button onClick={logout}>Cerrar sesión</button>
      <h1>Bienvenido ADMIN</h1>
    </div>
  ); 
}
