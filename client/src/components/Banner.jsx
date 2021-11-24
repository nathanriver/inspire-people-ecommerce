import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect } from "react";
import { API } from "../config";
import Loader from "./Loader";

const Banner = () => {
  const [banners, setBanners] = useState(null);

  useEffect(() => {
    const getBanners = async () => {
      const { data } = await API.get("/banners");
      setBanners(data);
    };
    getBanners();
  }, []);

  const settings = {
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
        {!banners ? (
          <Loader />
        ) : (
          banners.map((banner, i) => {
            return (
              <div key={i}>
                <img src={banner.image_url} alt={`banner-${i}`} />
              </div>
            );
          })
        )}
      </Slider>
    </div>
  );
};

export default Banner;
