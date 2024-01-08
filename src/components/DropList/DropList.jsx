import { useState } from "react";
import styles from "./DropList.module.css";
import dropistIcon from "../../assets/icons/drop-list-arraow.svg";
import PropsTypes from "prop-types";

export default function DropList({
  title = "",
  list = [],
  onSelected = () => {},
}) {
  const [isListOpen, setIsListOpen] = useState(false);

  const toggleList = () => {
    setIsListOpen(!isListOpen);
  };

  return (
    <div
      className={styles.dropList}
      onMouseEnter={toggleList}
      onMouseLeave={toggleList}
    >
      <div className={styles.titleContainer}>
        <span>{title}</span>
        <img src={dropistIcon} alt="drop list icon" />
      </div>
      {isListOpen && list && (
        <div className={styles.listContainer}>
          {list.map((item, index) => (
            <div
              key={index}
              className={styles.listItem}
              onClick={() => {
                onSelected(item);
                setIsListOpen(false);
              }}
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

DropList.PropsTypes = {
  title: PropsTypes.string.isRequired,
  list: PropsTypes.array.isRequired,
};
