import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const AppCard = (props) => {
  return (
    <Card style={{ width: "100%", marginTop: "30px" }}>
      <Card.Img
        variant="top"
        style={{
          height: "7rem",
          backgroundImage: 'url("' + props.url + '")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Card.Body>
        <Container>
          <Row>
            <Col style={{ textAlign: "left" }}>
              <Card.Title>{props.title}</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
            </Col>
            <Col xs={4} style={{ margin: "auto" }}>
              <Button variant="primary" href="/edit">
                Go somewhere
              </Button>
            </Col>
          </Row>
        </Container>
      </Card.Body>
    </Card>
  );
};

export default AppCard;
