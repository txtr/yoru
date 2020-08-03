import React, { useEffect, useState } from "react";
import { containsObject, removeObject } from "../containsObject";
import { Button } from "react-bootstrap";

const AddBtn = (props) => {
  const { menuList, setMenuList, setSaved, hit } = props;
  const [isShown, setIsShown] = useState(false);
  const handleClick = () => {
    if (!containsObject(menuList, hit)) setMenuList([...menuList, hit]);
    setSaved(false);
  };

  const handleRemove = () => {
    // console.log(menuList, hit);
    setMenuList(removeObject(menuList, hit));
    setSaved(false);
  };

  useEffect(() => {
    // console.log(hit, menuList);
  }, [menuList]);

  return (
    <Button
      variant="primary"
      disabled={containsObject(menuList, hit) && !isShown}
      onClick={containsObject(menuList, hit) ? handleRemove : handleClick}
      onMouseOver={() => {
        if (containsObject(menuList, hit)) setIsShown(true);
      }}
      onMouseLeave={() => setIsShown(false)}
      style={{ width: "150px" }}
    >
      {containsObject(menuList, hit)
        ? isShown
          ? "Remove"
          : "Served"
        : "Serve on menu"}
    </Button>
  );
};

export default AddBtn;
