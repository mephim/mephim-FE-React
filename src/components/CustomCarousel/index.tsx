import Carousel from "react-bootstrap/Carousel";

interface ICarouselProp {
  imagesSrc: string[];
  duration: number;
}

function CustomCarousel({ imagesSrc, duration }: ICarouselProp) {
  return (
    <Carousel>
      {imagesSrc.map((src: string) => (
        <Carousel.Item interval={duration}>
          <img className="d-block w-100" src={src} alt="First slide" />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default CustomCarousel;
