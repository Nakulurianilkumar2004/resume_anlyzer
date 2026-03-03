import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/api";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            await API.post("/auth/login", { email, password });
            const res = await API.get("/auth/me");

            if (res.data.role === "admin") {
                navigate("/admin");
            } else {
                navigate("/user");
            }
        } catch {
            alert("Invalid credentials");
        }
    };

    // Inline CSS as JS objects
    const styles = {
        container: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            background: "linear-gradient(to right, #667eea, #764ba2)",
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        },
        box: {
            background: "#fff",
            padding: "40px 30px",
            borderRadius: "12px",
            boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
            width: "350px",
            textAlign: "center",
        },
        heading: {
            marginBottom: "25px",
            color: "#333",
            fontSize: "24px",
            fontWeight: "600",
        },
        input: {
            width: "100%",
            padding: "12px 15px",
            margin: "10px 0",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "16px",
            outline: "none",
            transition: "all 0.3s",
        },
        inputFocus: {
            borderColor: "#667eea",
            boxShadow: "0 0 5px rgba(102, 126, 234, 0.5)",
        },
        button: {
            width: "100%",
            padding: "12px",
            margin: "15px 0",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#667eea",
            color: "#fff",
            fontSize: "16px",
            fontWeight: "600",
            cursor: "pointer",
            transition: "all 0.3s",
        },
        buttonHover: {
            backgroundColor: "#5563c1",
        },
        linkText: {
            color: "#667eea",
            textDecoration: "none",
            fontWeight: "500",
        },
        pText: {
            marginTop: "15px",
            fontSize: "14px",
            color: "#555",
        },
    };

    // State for hover effect on button
    const [hover, setHover] = useState(false);
    const buttonStyle = hover
        ? { ...styles.button, ...styles.buttonHover }
        : styles.button;

    return (
        <div style={styles.container}>
            <div style={styles.box}>
                <h2 style={styles.heading}>Resume Analyzer Login</h2>

                <input
                    type="email"
                    placeholder="Email"
                    style={styles.input}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    style={styles.input}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    style={buttonStyle}
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                    onClick={handleLogin}
                >
                    Login
                </button>

                <p style={styles.pText}>
                    Don't have an account?{" "}
                    <Link to="/register" style={styles.linkText}>
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Login;