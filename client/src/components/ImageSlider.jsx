import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { coverList } from "../data";

const ImageSlider = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <div className="mb-4">
      <Slider {...settings}>
        {coverList.map((cover, i) => {
          return (
            <div>
              <img key={i} src={cover} alt={cover} />
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default ImageSlider;
