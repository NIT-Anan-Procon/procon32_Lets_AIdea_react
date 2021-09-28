import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./css/Award.css";
import Title from "../../common/components/Title";
import Image from "../../common/components/Image";
import Icon from "../../common/components/Icon";
import Name from "../../common/components/Name";
import NgWord from "../../common/components/NgWord";
import OtherDescription from "../../common/components/OtherDescription";

export default function Award() {
  const [data, setData] = useState();
  const [ngWord, setNgWord] = useState("");
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState("読み込み中");

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_API + "/API/Game/End.php", {
        withCredentials: true,
      })
      .then((res) => {
        setData(res.data);
        getNgWord(res.data);
      })
      .catch(() => {
        setErrorMessage("エラーが発生しました");
      });
  }, []);

  const getNgWord = (data) => {
    for (let i = 0; i < data.ng.length; i++) {
      setNgWord((ngWord) => ngWord + data.ng[i]);
      if (i !== data.ng.length - 1) setNgWord((ngWord) => ngWord + ", ");
    }
  };

  const againHandleSubmit = () => {
    // TODO 待機画面に戻るパスを追加
    history.push("");
  };

  const leaveHandleSubmit = () => {
    // TODO モード選択画面に戻るパスを追加
    history.push("");
  };

  useEffect(() => {
    const onUnload = (e) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", onUnload);
    window.history.pushState(null, null, window.location.href);
    window.addEventListener("popstate", () => {
      history.go(1);
    });
  });

  if (!data) return <div>{errorMessage}</div>;
  else {
    return (
      <div className="quiz" id="quizAward">
        <Title text="優秀作品" />
        <Image src={data.pictureURL} alt="picture" />
        <div className="winner">
          <Icon src={data.icon} />
          <Name text={data.name} />
          <NgWord text={ngWord} />
          <OtherDescription title="説明文" text={data.explanation} />
        </div>
        <form className="buttonForm">
          <input
            type="submit"
            className="again"
            value="もう一度遊ぶ"
            onClick={againHandleSubmit}
          />
          <input
            type="submit"
            className="leave"
            value="部屋を抜ける"
            onClick={leaveHandleSubmit}
          />
        </form>
      </div>
    );
  }
}
