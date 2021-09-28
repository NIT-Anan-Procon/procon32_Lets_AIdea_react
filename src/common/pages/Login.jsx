import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./css/Login.css";
import axios from "axios";

export default function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [judgementMessage, setJudgementMessage] = useState("");
  const [attentionMessageToUserName, setAttentionMessageToUserName] =
    useState("");
  const [attentionMessageToPassword, setAttentionMessageToPassword] =
    useState("");
  const history = useHistory();
  const params = new FormData();

  const userNameChange = (event) => {
    setUserName(event.target.value);
  };

  const passwordChange = (event) => {
    setPassword(event.target.value);
  };

  const registerHandleSubmit = (event) => {
    if (userName.length === 0) {
      event.preventDefault();
      setAttentionMessageToUserName("新規登録ユーザー名を入力してください");
    } else if (password.length === 0) {
      event.preventDefault();
      setAttentionMessageToPassword("新規登録パスワードを入力してください");
    } else {
      event.preventDefault();
      params.append("name", userName);
      params.append("password", password);
      axios
        .post(
          import.meta.env.VITE_API_HOST + "/API/User/CreateUser.php",
          params,
          {
            headers: {
              "content-type": "multipart/form-data",
            },
          }
        )
        .then(() => {
          setJudgementMessage("新規登録に成功しました");
          params.delete("name");
          params.delete("password");
        })
        .catch(() => {
          setJudgementMessage("新規登録エラーが発生しました");
          params.delete("name");
          params.delete("password");
        });
    }
  };

  const loginHandleSubmit = (event) => {
    if (userName.length === 0) {
      event.preventDefault();
      setAttentionMessageToUserName("ログインユーザー名を入力してください");
    } else if (password.length === 0) {
      event.preventDefault();
      setAttentionMessageToPassword("ログインパスワードを入力してください");
    } else {
      event.preventDefault();
      params.append("name", userName);
      params.append("password", password);
      axios
        .post(import.meta.env.VITE_API_HOST + "/API/User/Login.php", params, {
          withCredentials: true,
          headers: {
            "content-type": "multipart/form-data",
          },
        })
        .then(() => {
          params.delete("name");
          params.delete("password");
          history.push("/selection");
        })
        .catch(() => {
          setJudgementMessage("ログインエラーが発生しました");
          params.delete("name");
          params.delete("password");
        });
    }
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
          type="password"
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
      <p id="judgementMessage">{judgementMessage}</p>
      <p className="attentionMessageUserName">{attentionMessageToUserName}</p>
      <p className="attentionMessagePassword">{attentionMessageToPassword}</p>
    </div>
  );
}
