import React, { useEffect, useState } from "react";
import { Carousel, ConfigProvider, message } from "antd";
import { getDataSlider } from "../../../api/api";
const contentStyle = {
  margin: 0,
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};
export default function Slider() {
  const [banner, setBanner] = useState([]);
  useEffect(() => {
    let fetchData = async () => {
      try {
        let response = await getDataSlider();
        setBanner(response.data.content);
      } catch {
        message.error("Đã có lỗi xảy ra");
      }
    };
    fetchData();
  }, []);
  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };
  return (
    <ConfigProvider
      theme={{
        components: {
          Carousel: {
            dotActiveWidth: 60,
            dotWidth: 20,
            dotHeight: 10,
          },
        },
      }}
    >
      <Carousel autoplay effect="fade" afterChange={onChange}>
        {banner.map((item, index) => {
          return (
            <img
              className="sm:h-56 md:h-72 lg:h-96 xl:h-[600px] w-full object-cover"
              src={item.hinhAnh}
              key={index}
              alt=""
            />
          );
        })}
      </Carousel>
    </ConfigProvider>
  );
}
