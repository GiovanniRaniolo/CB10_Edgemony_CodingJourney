import classNames from "classnames";
import styles from "./ThumbNail.module.css";

function ThumbNail({ isSelected = false, thumbNail = "" }) {
  return (
    <div
      className={classNames(styles.thumbNail, isSelected && styles.selected)}
    >
      <img src={thumbNail} />
      <div className={classNames(isSelected && styles.over)}></div>
    </div>
  );
}

export default ThumbNail;
