import React, { useEffect, useState } from "react";
import { getListMovie } from "../../../api/api";
import { Card } from "antd";
import Meta from "antd/es/card/Meta";
import { NavLink } from "react-router-dom";
import VideoPopup from "../../../components/VideoPopup/VideoPopup";

export default function ListMovie() {
  const [movieArr, setMovieArr] = useState([]);
  useEffect(() => {
    getListMovie()
      .then((res) => {
        console.log(res);
        let listFilm = res.data;
        setMovieArr(listFilm);
      })
      .catch((err) => {});
  }, []);
  return (
    <div className=" container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-10 ">
      {movieArr.slice(0, 8).map((item, index) => {
        return (
          <Card
            key={index}
            hoverable
            cover={
              <img
                className="h-48 object-cover"
                alt="example"
                src={item.hinhAnh}
              />
            }
          >
            <div className="pb-2">
              <Meta
                title={item.tenPhim}
                description={item.moTa.substring(0, 80) + "..."}
              />
            </div>
            <div className="flex justify-center mt-3">
              <VideoPopup link={item.trailer} className="w-1/2"></VideoPopup>
              <NavLink
                to={`/movie/${item.maPhim}`}
                className="flex justify-center w-1/2"
              >
                <button className="px-4 py-1 text-white font-medium bg-orange-600 rounded hover:bg-orange-700">
                  Mua vé
                </button>
              </NavLink>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
