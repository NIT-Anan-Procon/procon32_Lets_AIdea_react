import React from "react";
import "./css/style.css";
import "./css/Explanation.css";
import {Link} from 'react-router-dom';

export default function Explanation() {
    return (
        <>
            <div id={"title"}>この画像を説明しよう</div>
            <img src={"https://source.unsplash.com/featured/?lion,1"}></img>
            <div id={"ai_explanation"}></div>
            <div id={"ng_word"}></div>
            {/*<form onSubmit={postExplanation()}>*/}
            {/*    <input type={"text"} id={"te"}></input>*/}
            {/*    <input type={"submit"} id={"su"}>*/}
            {/*        <Link to={"/answer"}>決定</Link>*/}
            {/*    </input>*/}
            {/*</form>*/}
        </>
    );
}

function postExplanatnion() {
    console.log("post");
}