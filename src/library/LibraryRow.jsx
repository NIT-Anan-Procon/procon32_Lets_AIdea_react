import React, { useEffect, useState } from "react";
import "./css/LibraryRow.css";
import Icon from "../common/components/Icon";
import Image from "../common/components/Image";
import Name from "../common/components/Name";
import OtherDescription from "../common/components/OtherDescription";

export default function LibraryRow(props) {
  const [ngTitle, setNgTitle] = useState(props.ngWord);

  useEffect(() => {
    if (!props.ngWord) setNgTitle("なし");
  }, []);

  return (
    <div className="libraryRow">
      <Icon src={props.icon} />
      <Name text={props.name} />
      <Image src={props.image} alt="各プレイヤーのお題画像" class="image" />
      <OtherDescription
        title={"NGワード：" + ngTitle}
        text={props.description}
      />
    </div>
  );
}
