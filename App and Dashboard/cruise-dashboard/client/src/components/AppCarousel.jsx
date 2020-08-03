import React from "react";
import Carousel from "react-bootstrap/Carousel";
import CarouselBG from "./CarouselBG";

const AppCarousel = () => {
  return (
    <Carousel style={{ width: "100%", height: "55vh" }}>
      <Carousel.Item style={{ backgroundColor: "black", height: "100%" }}>
        <CarouselBG url="images/banner1.jpg" />
        <Carousel.Caption style={{ filter: "drop-shadow(0 0 10px black)" }}>
          <h3>Manage your deck</h3>
          <p>Look after services and staff on your cruise.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item style={{ backgroundColor: "black", height: "100%" }}>
        <CarouselBG url="images/banner2.jpg" />
        <Carousel.Caption style={{ filter: "drop-shadow(0 0 10px black)" }}>
          <h3>Organise events</h3>
          <p>Full length events and catering analytics.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item style={{ backgroundColor: "black", height: "100%" }}>
        <CarouselBG url="images/banner3.jpg" />
        <Carousel.Caption style={{ filter: "drop-shadow(0 0 10px black)" }}>
          <h3>Connect with your passengers</h3>
          <p>
            Make your customers feel valued, connect with them at an instant.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default AppCarousel;
