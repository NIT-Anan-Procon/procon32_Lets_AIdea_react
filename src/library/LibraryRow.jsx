import React from "react";
import "./css/LibraryRow.css";
import Icon from "../common/components/Icon";
import Name from "../common/components/Name";
import Image from "../common/components/Image";
import OtherDescription from "../common/components/OtherDescription";

export default function LibraryRow(props) {
  return (
    <div className="libraryRow">
      <Icon src={props.icon} />
      <Name text={props.name} />
      <Image src={props.image} alt="各プレイヤーのお題画像" class="image" />
      <OtherDescription
        title={"NGワード：" + props.ngWord}
        text={props.description}
      />
    </div>
  );
}
