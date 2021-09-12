import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./css/Login.css";
import axios from "axios";

export default function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [attentionMessageToUserName, setAttentionMessageToUserName] =
    useState("");
  const [attentionMessageToPassword, setAttentionMessageToPassword] =
    useState("");
  const params = new FormData();

  const userNameChange = (event) => {
    setUserName(event.target.value);
    params.append("name", userName);
  };

  const passwordChange = (event) => {
    setPassword(event.target.value);
    params.append("password", password);
  };

  const registerHandleSubmit = (event) => {
    if (userName.length === 0) {
      event.preventDefault();
      setAttentionMessageToUserName("新規登録ユーザー名を入力してください");
      return 0;
    } else if (password.length === 0) {
      event.preventDefault();
      setAttentionMessageToPassword("新規登録パスワードを入力してください");
      return 0;
    } else {
      event.preventDefault();
      axios
        .post("http://localhost/API/User/CreateUser.php", params, {
          headers: {
            "content-type": "multipart/form-data",
          },
        })
        .then((result) => {
          console.log(result.status);
        })
        .catch((error) => {
          console.log(error.request.status);
        });
    }
  };

  const loginHandleSubmit = (event) => {
    if (userName.length === 0) {
      event.preventDefault();
      setAttentionMessageToUserName("ログインユーザー名を入力してください");
      return 0;
    } else if (password.length === 0) {
      event.preventDefault();
      setAttentionMessageToPassword("ログインパスワードを入力してください");
      return 0;
    } else {
      event.preventDefault();
      axios
        .post("http://localhost/API/User/Login.php", params, {
          headers: {
            "content-type": "multipart/form-data",
          },
        })
        .then((result) => {
          console.log(result.status);
        })
        .catch((error) => {
          console.log(error.request.status);
        });
    }
    // history.push("/");
  };

  return (
    <div id="login">
      <div className="logo">Let&apos;s AIdea !</div>
      <form id="loginForm">
        <input
          type="text"
          value={userName}
          placeholder="ユーザー名"
          onChange={userNameChange}
          id="inputUserName"
        />
        <input
          type="text"
          value={password}
          placeholder="パスワード"
          onChange={passwordChange}
          id="inputPassword"
        />
        <input
          type="submit"
          id="loginButton"
          value="ログイン"
          onClick={loginHandleSubmit}
        />
        <input
          type="submit"
          id="registerButton"
          value="新規登録"
          onClick={registerHandleSubmit}
        />
      </form>
      <p className="attentionMessageUserName">{attentionMessageToUserName}</p>
      <p className="attentionMessagePassword">{attentionMessageToPassword}</p>
    </div>
  );
}
