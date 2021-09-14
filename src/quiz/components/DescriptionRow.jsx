import React from "react";
import "./css/DescriptionRow.css";
import Icon from "../../common/components/Icon";
import Name from "../../common/components/Name";
import Image from "../../common/components/Image";
import OtherDescription from "../../common/components/OtherDescription";

export default function DescriptionRow(props) {
  const handleChange = (event) => {
    props.setMyChoice(event.target.value);
  };

  return (
    <div className="descriptionRow">
      <input
        type="radio"
        name="selectDescription"
        value={props.number}
        onChange={handleChange}
        id={"myChoice" + props.number}
      />
      <label
        htmlFor={"myChoice" + props.number}
        id={"description" + props.number}
      >
        <Icon src={props.icon} />
        <Name text={props.name} />
        <Image src={props.image} alt="各プレイヤーのお題画像" class="image" />
        <OtherDescription
          title={"NGワード：" + props.ngWord}
          text={props.description}
        />
      </label>
    </div>
  );
}
