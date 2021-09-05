import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./css/Login.css";

export default function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [attentionMessageToUserName, setAttentionMessageToUserName] =
    useState("");
  const [attentionMessageToPassword, setAttentionMessageToPassword] =
    useState("");

  const userNameChange = (event) => {
    setUserName(event.target.value);
  };

  const passwordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    if (userName.length === 0) {
      event.preventDefault();
      setAttentionMessageToUserName("ユーザー名を入力してください");
      return 0;
    }
    if (password.length === 0) {
      event.preventDefault();
      setAttentionMessageToPassword("パスワードを入力してください");
      return 0;
    }
  };

  return (
    <div id="login">
      <div className="logo">Let's AIdea !!</div>
      <form onSubmit={handleSubmit} id="loginForm">
        <input
          type="text"
          value={userName}
          placeholder="ユーザー名"
          onChange={userNameChange}
          className="textBox"
        />
        <input
          type="text"
          value={password}
          placeholder="パスワード"
          onChange={passwordChange}
          className="textBox"
        />
        <input type="submit" value="ログイン" />
        <input type="submit" value="新規登録" />
      </form>
      <p className="attentionMessage">{attentionMessageToUserName}</p>
      <p className="attentionMessage">{attentionMessageToPassword}</p>
    </div>
  );
}
