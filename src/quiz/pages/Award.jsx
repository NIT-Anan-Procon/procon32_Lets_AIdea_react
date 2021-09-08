import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./css/quiz.css";
import "./css/Award.css";
import Title from "../../common/components/Title";
import Image from "../../common/components/Image";
import Icon from "../../common/components/Icon";
import Name from "../../common/components/Name";
import OtherDescription from "../../common/components/OtherDescription";
import NgWord from "../../common/components/NgWord";

export default function Award() {
  const data = {
    name: "Togo",
    icon: "https://source.unsplash.com/featured/?dog",
    explanation: "百獣の王は静かに微笑みを湛えている",
    ng: ["ライオン", "草原"],
    pictureURL: "https://source.unsplash.com/featured/?random",
  };
  const [ngWord, setNgWord] = useState("");
  const history = useHistory();

  useEffect(() => {
    for (let i = 0; i < data.ng.length; i++) {
      setNgWord((ngWord) => ngWord + data.ng[i]);
      if (i !== data.ng.length - 1) setNgWord((ngWord) => ngWord + ", ");
    }
  }, []);

  const againHandleSubmit = () => {
    history.push("");
  };

  const leaveHandleSubmit = () => {
    history.push("");
  };

  return (
    <div id="award">
      <Title text="優秀作品" />
      <Image src={data.pictureURL} alt="picture" />
      <div className="player">
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
