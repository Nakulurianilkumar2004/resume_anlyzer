import { useNavigate } from "react-router-dom";
import API from "../api/api";

function Navbar({ title }) {
    const navigate = useNavigate();

    const handleLogout = async () => {
        await API.post("/auth/logout");
        navigate("/");
    };

    return (
        <div className="navbar">
            <h2>{title}</h2>
            <button className="logout-btn" onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
}

export default Navbar;