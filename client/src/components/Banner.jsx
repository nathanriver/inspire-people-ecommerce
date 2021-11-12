import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { banners } from "../data";

const Banner = () => {
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
        {banners.map((banner, i) => {
          return (
            <div>
              <img key={i} src={banner} alt={banner} />
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default Banner;
