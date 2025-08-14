import React from 'react';
import { Link } from "react-router-dom";

export default function ErrorMessage(props) {
    return (
        <div className="ui message error">
            <h4>{props.error}</h4>
            <ul>
                <li>
                    <Link to="/signup">Sign Up</Link>
                </li>
                <li>
                    <Link to="/login">login</Link>
                </li>
                <li>
                    <Link to="/">Home</Link>
                </li>
            </ul>
        </div>
    );
}