import React, { useEffect, useState } from "react";
import { containsObject, removeObject } from "../containsObject";
import { Button } from "react-bootstrap";

const AddBtn = (props) => {
  const { eventList, setEventList, setSaved, hit } = props;
  const [isShown, setIsShown] = useState(false);
  const handleClick = () => {
    if (!containsObject(eventList, hit)) setEventList([...eventList, hit]);
    setSaved(false);
  };

  const handleRemove = () => {
    // console.log(eventList, hit);
    setEventList(removeObject(eventList, hit));
    setSaved(false);
  };

  useEffect(() => {
    // console.log(hit, eventList);
  }, [eventList]);

  return (
    <Button
      variant="primary"
      disabled={containsObject(eventList, hit) && !isShown}
      onClick={containsObject(eventList, hit) ? handleRemove : handleClick}
      onMouseOver={() => {
        if (containsObject(eventList, hit)) setIsShown(true);
      }}
      onMouseLeave={() => setIsShown(false)}
      style={{ width: "150px" }}
    >
      {containsObject(eventList, hit)
        ? isShown
          ? "Remove"
          : "Arranged"
        : "Arrange event"}
    </Button>
  );
};

export default AddBtn;
