import { useState } from "react";
import classes from "./DropList.module.css";
import dropistIcon from "../../assets/icons/drop-list-arraow.svg";
import PropsTypes from "prop-types";
import log from "../../utils/log";

function DropList({ title = "", list = [], onSelecte = () => {}, id = "" }) {
  log("<DropList/ > rendering");

  const [isListOpen, setIsListOpen] = useState(false);

  const handleShowList = () => {
    setIsListOpen(true);
  };

  const handleHideList = () => {
    setIsListOpen(false);
  };

  const handleItemSelection = (item) => {
    onSelecte(item);
    setIsListOpen(false);
  };

  return (
    <>
      <div
        className={`${classes.dropList}`}
        onMouseEnter={handleShowList}
        onMouseLeave={handleHideList}
        onClick={isListOpen ? handleHideList : handleShowList}
        id={id}
      >
        <div className={`${classes.titleContainer}`}>
          <span>{title}</span>
          <img src={dropistIcon} alt="drop list icon" />
        </div>
        {isListOpen && list && (
          <div className={`${classes.listContainer}`} id={`${id}-list`}>
            {list.map((item, index) => (
              <div
                key={index}
                className={`${classes.listItem}`}
                onClick={() => handleItemSelection(item)}
              >
                {item}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

DropList.PropsTypes = {
  title: PropsTypes.string.isRequired,
  list: PropsTypes.array.isRequired,
};

export default DropList;
