import { useNavigate } from "react-router-dom";

export default function Home() {

const navigate = useNavigate();

const logout = () => {
  localStorage.clear();
  navigate("/login", { replace: true });
};
    return (
        <div>
            <h1>Bienvenido, estás autenticado</h1>
            <button onClick={logout}>Cerrar sesión</button>
        </div>
    )
}
