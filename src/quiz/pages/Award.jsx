import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./css/Award.css";
import Icon from "../../common/components/Icon";
import Image from "../../common/components/Image";
import Name from "../../common/components/Name";
import NgWord from "../../common/components/NgWord";
import OtherDescription from "../../common/components/OtherDescription";
import Title from "../../common/components/Title";

export default function Award() {
  const [data, setData] = useState();
  const [ngWord, setNgWord] = useState("");
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState("読み込み中");

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_API_HOST + "/API/Game/End.php", {
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

  const againHandleSubmit = (event) => {
    event.preventDefault();
    axios
      .get(import.meta.env.VITE_API_HOST + "/API/Room/JoinAgain.php", {
        withCredentials: true,
      })
      .then((res) => {
        history.push("/waiting");
      });
  };

  const leaveHandleSubmit = (event) => {
    event.preventDefault();
    axios
      .get(import.meta.env.VITE_API_HOST + "/API/Room/LeaveRoom.php", {
        withCredentials: true,
      })
      .then((res) => {
        history.push("/selection");
      });
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
