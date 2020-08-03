import React, { Fragment } from "react";

const HitCard = (props) => {
  const hit = props.hit;
  return (
    <Fragment>
      <div
        style={{
          height: "150px",
          minWidth: "150px",
          backgroundImage: "url(" + hit.img_url + ")",
          backgroundColor: "gray",
          color: "white",
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "5px",
        }}
      >
        {hit.img_url ? null : (
          <div style={{ fontSize: "20px", marginTop: "53px" }}>No image</div>
        )}
      </div>
      <div className="hit-card-text">
        <div className="hit-card-desc" style={{ lineHeight: "30px" }}>
          <b>{hit.name}</b>
          <p>{hit.category}</p>
        </div>
        <p className="hit-card-price" style={{ paddingTop: "20px" }}>
          <b>Price:</b> ${hit.price}
        </p>
      </div>
    </Fragment>
  );
};

export default HitCard;
