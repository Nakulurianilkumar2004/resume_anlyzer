import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../api/api";

function AdminDashboard() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const res = await API.get("/resume/admin/active-users");
            setUsers(res.data.users);
        };
        fetchUsers();
    }, []);

    // Inline CSS styles
    const styles = {
        container: {
            maxWidth: "900px",
            margin: "20px auto",
            padding: "0 20px",
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        },
        card: {
            background: "#fff",
            borderRadius: "12px",
            padding: "30px 20px",
            boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
            marginBottom: "20px",
        },
        heading: {
            fontSize: "22px",
            fontWeight: "600",
            color: "#333",
            marginBottom: "20px",
            textAlign: "center",
        },
        list: {
            listStyleType: "none",
            padding: 0,
            maxHeight: "400px",
            overflowY: "auto",
        },
        listItem: {
            padding: "12px 15px",
            marginBottom: "10px",
            borderRadius: "8px",
            backgroundColor: "#f3f4f6",
            borderLeft: "5px solid #667eea",
            transition: "all 0.3s",
            cursor: "default",
        },
        listItemHover: {
            backgroundColor: "#e0e7ff",
        },
    };

    const [hoverIndex, setHoverIndex] = useState(null);

    return (
        <div style={styles.container}>
            <Navbar title="Admin Dashboard" />

            <div style={styles.card}>
                <h3 style={styles.heading}>Active Users</h3>
                {users.length === 0 ? (
                    <p style={{ textAlign: "center", color: "#555" }}>
                        No active users yet.
                    </p>
                ) : (
                    <ul style={styles.list}>
                        {users.map((email, index) => (
                            <li
                                key={index}
                                style={
                                    hoverIndex === index
                                        ? { ...styles.listItem, ...styles.listItemHover }
                                        : styles.listItem
                                }
                                onMouseEnter={() => setHoverIndex(index)}
                                onMouseLeave={() => setHoverIndex(null)}
                            >
                                {email}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default AdminDashboard;