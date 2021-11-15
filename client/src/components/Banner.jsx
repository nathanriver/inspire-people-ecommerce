import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBanners } from "../features/banners/bannersSlice";

const Banner = () => {
  const dispatch = useDispatch();
  const { banners } = useSelector((state) => state.banners);

  useEffect(() => {
    dispatch(getBanners());
  }, [dispatch]);

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
        {banners &&
          banners.map((banner, i) => {
            return (
              <div key={i}>
                <img src={banner.image_url} alt={`banner-${i}`} />
              </div>
            );
          })}
      </Slider>
    </div>
  );
};

export default Banner;
