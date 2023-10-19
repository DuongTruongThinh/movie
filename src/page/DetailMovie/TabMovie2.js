import React, { createContext, useEffect, useState } from "react";
import { getMovieByTheater } from "../../api/api";
import { Tabs } from "antd";
import moment from "moment/moment";
import { NavLink } from "react-router-dom";
// import type { TabsProps } from 'antd';

const onChange = (key) => {};

export default function TabMovie2(props) {
  const [danhSachHeThongRap, setDanhSachHeThongRap] = useState([]);
  const { id } = props;
  console.log(props);
  useEffect(() => {
    getMovieByTheater()
      .then((res) => {
        setDanhSachHeThongRap(res.data.content);
      })
      .catch((err) => {});
  }, []);
  let renderDsPhim = (dsPhim) => {
    return dsPhim.map((phim) => {
      return (
        <div className="flex space-x-5 p-3 items-center">
          <div>
            <div className="grid grid-cols-4 gap-5">
              {phim.lstLichChieuTheoPhim.slice(0 - 8).map((lichChieu) => {
                // console.log(lichChieu);
                return (
                  <div>
                    {/* <span>{lichChieu.maLichChieu}</span> */}
                    <button className="bg-red-500 text-white px-5 py-2">
                      <NavLink
                        className="text - white"
                        to={`/ticketroom/${lichChieu.maLichChieu}`}
                      >
                        <span className="bg-red-500 text-white px-5 py-2">
                          {moment(lichChieu).format("LLLL")}
                        </span>
                      </NavLink>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      );
    });
  };
  let handleHeThongRap = () => {
    return danhSachHeThongRap.map((heThongRap, index) => {
      return {
        key: index,
        label: <img className="w-16" src={heThongRap.logo}></img>,
        children: (
          <Tabs
            style={{ height: 500 }}
            tabPosition="left"
            items={heThongRap.lstCumRap.map((cumRap) => {
              return {
                key: cumRap.tenCumRap,
                label: (
                  <div className="text-left w-96 whitespace-normal">
                    <p className="text-green-700 font-medium hover:text-blue-800">
                      {cumRap.tenCumRap}{" "}
                    </p>
                    <p>{cumRap.diaChi}</p>
                  </div>
                ),
                children: (
                  <div style={{ height: 500, overflow: "scroll" }}>
                    {renderDsPhim(cumRap.danhSachPhim)}
                  </div>
                ),
              };
            })}
          ></Tabs>
        ),
      };
    });
  };

  return (
    <div className="container shadow-md p-3 rounded-2 border-2">
      <Tabs
        style={{ height: 500 }}
        tabPosition="left"
        defaultActiveKey="1"
        items={handleHeThongRap()}
        onChange={onChange}
      />
    </div>
  );
}
