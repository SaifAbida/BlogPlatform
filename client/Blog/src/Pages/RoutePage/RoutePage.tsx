import Carousel from "react-bootstrap/Carousel";
import image1 from "../../assets/image1.avif";
import image2 from "../../assets/image2.avif";
import image3 from "../../assets/image3.avif";
import "./RoutePage.css";

const CarouselType = {
  width: "900px",
  margin: "85px",
  borderRadius: "10px",
};

const RoutePage = () => {
  return (
    <div className="routePageContainer">
      <Carousel style={CarouselType}>
        <Carousel.Item interval={1000} style={{ borderRadius: "10px" }}>
          <img src={image1} alt="First slide" />
        </Carousel.Item>
        <Carousel.Item interval={500} style={{ borderRadius: "10px" }}>
          <img src={image2} alt="Second slide" />
        </Carousel.Item>
        <Carousel.Item style={{ borderRadius: "10px" }}>
          <img src={image3} alt="Second slide" />
        </Carousel.Item>
      </Carousel>
      <h1>Discover, Share, Inspire: Your Gateway to Insight</h1>
    </div>
  );
};

export default RoutePage;
