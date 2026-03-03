import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import API from "../api/api";

function ProtectedRoute({ children, role }) {
    const [loading, setLoading] = useState(true);
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        const checkUser = async () => {
            try {
                const res = await API.get("/auth/me");
                if (res.data.role === role) {
                    setAuthorized(true);
                }
            } catch {
                setAuthorized(false);
            }
            setLoading(false);
        };
        checkUser();
    }, [role]);

    if (loading) return <div className="center">Loading...</div>;
    if (!authorized) return <Navigate to="/" />;

    return children;
}

export default ProtectedRoute;

