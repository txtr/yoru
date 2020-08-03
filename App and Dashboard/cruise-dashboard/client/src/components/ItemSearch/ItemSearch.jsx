import React, { useState } from "react";
import { InstantSearch, SearchBox, Hits } from "react-instantsearch-dom";
import { Button, Spinner } from "react-bootstrap";
import algoliasearch from "algoliasearch";
import AddBtn from "./AddBtn";
import HitCard from "./HitCard";
import Axios from "axios";
import "./ItemSearch.css";

const searchClient = algoliasearch(
  "BAINZYIMSN",
  "fd3996f9bb80a4cb69dcdfcc6f94cc42"
);

const ItemSearch = (props) => {
  const { menuList, setMenuList } = props;
  const [isSaving, setSaving] = useState(false);
  const [saved, setSaved] = useState(true);

  const Hit = ({ hit }) => (
    <div className="hit-card-container">
      <HitCard hit={hit} />
      <div style={{ height: "auto", marginBottom: "auto", marginTop: "auto" }}>
        <AddBtn
          menuList={menuList}
          setMenuList={setMenuList}
          hit={hit}
          setSaved={setSaved}
        />
      </div>
    </div>
  );

  const handleClick = async () => {
    setSaving(true);
    let response = await Axios.post("http://localhost:5000/saveMenu", {
      arr: menuList,
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
        <h3>Add/remove menu items</h3>
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
      <InstantSearch indexName="menu_items" searchClient={searchClient}>
        <div className="right-panel">
          <SearchBox />
          <Hits hitComponent={Hit} />
        </div>
      </InstantSearch>
    </div>
  );
};

export default ItemSearch;
