import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./css/Award.css";
import Title from "../../common/components/Title";
import Image from "../../common/components/Image";
import Icon from "../../common/components/Icon";
import Name from "../../common/components/Name";
import OtherDescription from "../../common/components/OtherDescription";
import NgWord from "../../common/components/NgWord";

export default function Award() {
  const [data, setData] = useState();
  const [ngWord, setNgWord] = useState("");
  const history = useHistory();

  useEffect(() => {
    axios
      .get("http://localhost/API/End.php", {})
      .then((res) => {
        console.log(res);
        setData(res);
        getNgWord(res);
      })
      .catch((error) => {
        console.log(error.request.status);
      });
  }, []);

  const getNgWord = (data) => {
    console.log(data.data.ng.length);
    for (let i = 0; i < data.data.ng.length; i++) {
      setNgWord((ngWord) => ngWord + data.data.ng[i]);
      if (i !== data.data.ng.length - 1) setNgWord((ngWord) => ngWord + ", ");
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

  console.log(data);
  return (
    <div id="award">
      <Title text="優秀作品" />
      <Image src={data.data.pictureURL} alt="picture" />
      <div className="player">
        <Icon src={data.data.icon} />
        <Name text={data.data.name} />
        <NgWord text={ngWord} />
        <OtherDescription title="説明文" text={data.data.explanation} />
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
