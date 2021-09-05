import "./css/Timeup.css";

export default function Timeup(props) {
  switch (props.time) {
    case 0:
      return <div className="Timeup">Time Up</div>;
    default:
      return null;
  }
}
