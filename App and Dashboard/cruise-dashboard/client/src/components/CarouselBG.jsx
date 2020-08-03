import React from "react";

const CarouselBG = (props) => {
  return (
    <div
      className="d-block w-100"
      style={{
        width: "100%",
        height: "100%",
        backgroundImage: 'url("' + props.url + '")',
        opacity: "0.7",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      alt="First slide"
    />
  );
};

export default CarouselBG;
