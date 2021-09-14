import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./css/Award.css";
import Title from "../../common/components/Title";
import Image from "../../common/components/Image";
import Icon from "../../common/components/Icon";
import Name from "../../common/components/Name";
import OtherDescription from "../../common/components/OtherDescription";

export default function Award() {
  const [data, setData] = useState();
  const history = useHistory();

  useEffect(() => {
    axios
      .get("http://localhost/API/End.php")
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((error) => {
        console.log(error.request.status);
        return <div>エラーが発生しました</div>;
      });
  }, []);

  const againHandleSubmit = () => {
    // TODO 待機画面に戻るパスを追加
    history.push("");
  };

  const leaveHandleSubmit = () => {
    // TODO モード選択画面に戻るパスを追加
    history.push("");
  };

  window.history.pushState(null, null, location.href);
  window.addEventListener("popstate", (e) => {
    history.go(1);
  });

  if (!data) return <div>読み込み中</div>;
  else {
    return (
      <div id="learnAward">
        <Title text="優秀作品" />
        <Image src={data.pictureURL} alt="優秀作品の画像" />
        <div className="winner">
          <Icon src={data.icon} />
          <Name text={data.name} />
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
