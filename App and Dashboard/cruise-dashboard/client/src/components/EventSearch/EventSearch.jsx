import React, { useState } from "react";
import { InstantSearch, SearchBox, Hits } from "react-instantsearch-dom";
import { Button, Spinner } from "react-bootstrap";
import algoliasearch from "algoliasearch";
import HitCard from "./HitCard";
import Axios from "axios";
import "./EventSearch.css";

const searchClient = algoliasearch(
  "BAINZYIMSN",
  "fd3996f9bb80a4cb69dcdfcc6f94cc42"
);

const EventSearch = (props) => {
  const { eventList, setEventList } = props;
  const [isSaving, setSaving] = useState(false);
  const [saved, setSaved] = useState(true);

  const Hit = ({ hit }) => (
    <div className="event-hit-card-container">
      <HitCard
        hit={hit}
        eventList={eventList}
        setEventList={setEventList}
        setSaved={setSaved}
      />
    </div>
  );

  const handleClick = async () => {
    setSaving(true);
    let response = await Axios.post("http://localhost:5000/saveEvents", {
      arr: eventList,
    });
    console.log("Response", response);
    setSaving(false);
    setSaved(true);
  };

  return (
    <div className="ais-InstantSearch">
      <div
        style={{ display: "flex", flexDirection: "row", paddingTop: "20px" }}
      >
        <h3>Add/remove events</h3>
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "row",
            margin: "auto 0 auto auto",
          }}
        >
          <div style={{ margin: "auto", marginRight: "10px" }}>
            <Spinner animation="border" variant="primary" hidden={!isSaving} />
          </div>
          <Button
            onClick={handleClick}
            style={{
              height: "40px",
            }}
            disabled={saved}
          >
            {isSaving ? "Saving..." : saved ? "Saved" : "Save menu"}
          </Button>
        </div>
      </div>
      <InstantSearch indexName="events" searchClient={searchClient}>
        <div className="right-panel events">
          <SearchBox />
          <Hits hitComponent={Hit} />
        </div>
      </InstantSearch>
    </div>
  );
};

export default EventSearch;
