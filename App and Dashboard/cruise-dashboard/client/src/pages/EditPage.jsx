import React, { useEffect, useState } from "react";
import Axios from "axios";
import ItemSearch from "../components/ItemSearch/ItemSearch";
import EventSearch from "../components/EventSearch/EventSearch";
import { Tabs, Tab } from "react-bootstrap";

const EditPage = () => {
  const [menuList, setMenuList] = useState([]);
  const [eventList, setEventList] = useState([]);

  const getOldJson = async () => {
    let menuItems = await Axios.get("http://localhost:5000/menuItems");
    setMenuList(menuItems.data);
    let events = await Axios.get("http://localhost:5000/events");
    setEventList(events.data);
  };

  useEffect(() => {
    getOldJson();
  }, []);

  return (
    <div className="edit-menu-container">
      <Tabs defaultActiveKey="menuItems" id="uncontrolled-tab-example">
        <Tab eventKey="menuItems" title="Menu Items">
          <ItemSearch menuList={menuList} setMenuList={setMenuList} />
        </Tab>
        <Tab eventKey="event" title="Events">
          <EventSearch eventList={eventList} setEventList={setEventList} />
        </Tab>
        <Tab eventKey="profile" title="Profile">
          Other
        </Tab>
      </Tabs>
    </div>
  );
};

export default EditPage;
