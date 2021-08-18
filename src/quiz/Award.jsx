import React from "react";
import "./css/style.css";
import { Link } from 'react-router-dom';

export default function Award() {
    return (
        <>
            <button type={"button"}>
                <Link to={"/explanation"}>explanation</Link>
            </button>
        </>
    );
}