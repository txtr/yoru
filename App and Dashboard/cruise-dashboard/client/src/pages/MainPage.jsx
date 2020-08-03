import React, { Fragment } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AppCarousel from "../components/AppCarousel";
import AppCard from "../components/AppCard";

const MainPage = () => {
  return (
    <Fragment>
      <Row>
        <AppCarousel />
      </Row>
      <Container className="content">
        <Row>
          <Col xs={6}>
            <AppCard title="Restaurants" url="images/card1.jpg" />
          </Col>
          <Col xs={6}>
            <AppCard title="Events" url="images/card2.jpg" />
          </Col>
        </Row>
        <Row>
          <Col xs={6}>
            <AppCard title="Specials" url="images/card3.jpg" />
          </Col>
        </Row>
      </Container>{" "}
    </Fragment>
  );
};

export default MainPage;
