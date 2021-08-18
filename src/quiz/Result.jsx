import React from "react";
import "./css/style.css";
import { Link } from 'react-router-dom';

export default function Result() {
    return (
        <>
            <button type={"button"}>
                <Link to={"/voting"}>voting</Link>
            </button>
        </>
    );
}