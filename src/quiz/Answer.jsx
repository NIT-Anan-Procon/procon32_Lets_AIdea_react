import React from "react";
import "./css/style.css";
import { Link } from 'react-router-dom';

export default function Answer() {
    return (
        <>
            <button type={"button"}>
                <Link to={"/result"}>result</Link>
            </button>
        </>
    );
}