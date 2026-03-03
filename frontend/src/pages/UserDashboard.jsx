import { useState } from "react";
import Navbar from "../components/Navbar";
import API from "../api/api";
import "./UserDashboard.css";

function UserDashboard() {
    const [resume, setResume] = useState(null);
    const [jd, setJd] = useState("");
    const [result, setResult] = useState("");

    const handleAnalyze = async () => {
        if (!resume || !jd) {
            alert("Please upload resume and paste job description");
            return;
        }

        const formData = new FormData();
        formData.append("resume", resume);
        formData.append("jd", jd);

        const res = await API.post("/resume/analyze", formData);
        setResult(res.data.analysis);
    };

    return (
        <div className="dashboard-container">
            <Navbar title="User Dashboard" />

            <div className="dashboard-card">
                <h3 className="dashboard-heading">Upload Resume & Job Description</h3>

                <input
                    type="file"
                    className="dashboard-input"
                    onChange={(e) => setResume(e.target.files[0])}
                />

                <textarea
                    placeholder="Paste Job Description here..."
                    rows="6"
                    className="dashboard-textarea"
                    onChange={(e) => setJd(e.target.value)}
                />

                <button
                    className="dashboard-button"
                    onClick={handleAnalyze}
                >
                    Analyze Resume
                </button>
            </div>

            {result && (
                <div className="dashboard-card dashboard-result-card">
                    <h3 className="dashboard-heading">AI Analysis Result</h3>
                    <pre className="dashboard-result-pre">{result}</pre>
                </div>
            )}
        </div>
    );
}

export default UserDashboard;