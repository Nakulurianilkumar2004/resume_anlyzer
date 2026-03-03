import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/api";

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            await API.post("/auth/signup", { email, password });
            alert("Registration successful");
            navigate("/");
        } catch (error) {
            console.error(error);
            alert("Registration failed");
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-box">
                <h2>Resume Analyzer</h2>
                <p className="subtitle">Create your account</p>

                <input
                    type="email"
                    placeholder="Email Address"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button onClick={handleRegister}>Register</button>

                <p className="login-text">
                    Already have an account?{" "}
                    <Link to="/">Login</Link>
                </p>
            </div>

            {/* Internal CSS */}
            <style>{`
                .auth-page {
                    min-height: 100vh;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background: linear-gradient(135deg, #0f172a, #1e293b);
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                }

                .auth-box {
                    background: rgba(255, 255, 255, 0.05);
                    backdrop-filter: blur(15px);
                    padding: 40px;
                    width: 380px;
                    border-radius: 20px;
                    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.5);
                    text-align: center;
                    color: #fff;
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                }

                .auth-box:hover {
                    transform: translateY(-6px);
                    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
                }

                .auth-box h2 {
                    margin-bottom: 8px;
                    font-size: 26px;
                    color: #38bdf8;
                }

                .subtitle {
                    margin-bottom: 25px;
                    font-size: 14px;
                    color: #cbd5e1;
                }

                .auth-box input {
                    width: 100%;
                    padding: 12px;
                    margin-bottom: 18px;
                    border-radius: 10px;
                    border: none;
                    outline: none;
                    font-size: 14px;
                    background: rgba(255, 255, 255, 0.1);
                    color: #fff;
                    transition: all 0.3s ease;
                }

                .auth-box input::placeholder {
                    color: #cbd5e1;
                }

                .auth-box input:focus {
                    background: rgba(255, 255, 255, 0.2);
                    box-shadow: 0 0 8px #38bdf8;
                }

                .auth-box button {
                    width: 100%;
                    padding: 12px;
                    border-radius: 10px;
                    border: none;
                    background: #38bdf8;
                    color: #0f172a;
                    font-weight: bold;
                    font-size: 15px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .auth-box button:hover {
                    background: #0ea5e9;
                    transform: scale(1.03);
                }

                .login-text {
                    margin-top: 18px;
                    font-size: 13px;
                    color: #cbd5e1;
                }

                .login-text a {
                    color: #38bdf8;
                    text-decoration: none;
                    font-weight: 500;
                }

                .login-text a:hover {
                    text-decoration: underline;
                }

                @media (max-width: 420px) {
                    .auth-box {
                        width: 90%;
                        padding: 30px;
                    }
                }
            `}</style>
        </div>
    );
}

export default Register;