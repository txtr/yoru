import React, { Fragment } from "react";
import AddBtn from "./AddBtn";

const HitCard = (props) => {
  const { hit, eventList, setEventList, setSaved } = props;
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
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div className="hit-card-desc" style={{ lineHeight: "30px" }}>
            <b>{hit.name}</b>
            <p>{hit.details}</p>
          </div>
          <div className="event-btn-container">
            <AddBtn
              eventList={eventList}
              setEventList={setEventList}
              hit={hit}
              setSaved={setSaved}
            />
          </div>
        </div>
        <div>
          <p className="hit-card-price" style={{ paddingTop: "20px" }}>
            <b>Venue:</b> {hit.venue}
          </p>
          <p className="hit-card-price">
            <b>Time:</b> {hit.time}
          </p>
        </div>
      </div>
    </Fragment>
  );
};

export default HitCard;
