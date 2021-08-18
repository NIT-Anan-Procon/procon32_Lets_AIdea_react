import React from "react";
import "./css/style.css";
import { Link } from 'react-router-dom';

export default function Voting() {
    return (
        <>
            <button type={"button"}>
                <Link to={"/award"}>award</Link>
            </button>
        </>
    );
}