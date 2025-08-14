import React from 'react';
import { Link } from "react-router-dom";

export default function ErrorMessage(props) {
    return (
        <div style={{
            backgroundColor: "#fff6f6",
            border: "1px solid #e0b4b4",
            borderRadius: "4px",
            padding: "15px",
            margin: "15px 0",
            color: "#9f3a38"
        }}>
            <h4 style={{ margin: "0 0 10px 0", fontSize: "14px" }}>{props.error}</h4>
            <ul style={{ margin: "0", paddingLeft: "20px" }}>
                <li>
                    <Link to="/signup" style={{ color: "#2185d0" }}>Sign Up</Link>
                </li>
                <li>
                    <Link to="/login" style={{ color: "#2185d0" }}>Login</Link>
                </li>
                <li>
                    <Link to="/" style={{ color: "#2185d0" }}>Home</Link>
                </li>
            </ul>
        </div>
    );
}