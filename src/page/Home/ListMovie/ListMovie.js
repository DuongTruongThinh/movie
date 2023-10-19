import React, { useEffect, useState } from "react";
import { getListMovie } from "../../../api/api";
import { Card } from "antd";
import Meta from "antd/es/card/Meta";
import { NavLink } from "react-router-dom";

export default function ListMovie() {
  const [movieArr, setMovieArr] = useState([]);
  useEffect(() => {
    getListMovie()
      .then((res) => {
        let listFilm = res.data.content.slice().reverse();
        setMovieArr(listFilm);
      })
      .catch((err) => {});
  }, []);
  return (
    <div className=" container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-10">
      {movieArr.slice(0, 8).map((item, index) => {
        return (
          <Card
            hoverable
            // style={{ width: 240 }}
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

            <button className="px-20 py-5 text-white bg-red-500 rounded">
              <NavLink className="text - white" to={`/movie/${item.maPhim}`}>
                {" "}
                Mua vé
              </NavLink>
            </button>
          </Card>
        );
      })}
    </div>
  );
}
