import React, { createContext, useEffect, useState } from "react";
import { getMovieByTheater } from "../../../api/api";
import { Tabs } from "antd";
import moment from "moment/moment";
import { NavLink } from "react-router-dom";
// import type { TabsProps } from 'antd';

const onChange = (key) => {};
// lấy danh sách hệ thống rạp /QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=GP09
export default function TabMovie() {
  const [danhSachHeThongRap, setDanhSachHeThongRap] = useState([]);
  useEffect(() => {
    getMovieByTheater()
      .then((res) => {
        console.log(res);
        setDanhSachHeThongRap(res.data);
      })
      .catch((err) => {});
  }, []);
  // render danh sách phim
  let renderDsPhim = (dsPhim) => {
    return dsPhim.map((phim, index) => {
      return (
        <div key={index} className="flex space-x-5 p-3 items-center">
          <img src={phim.hinhAnh} className="w-20 h-32 object-cover"></img>
          <div>
            <p>{phim.tenPhim}</p>
            <div className="grid grid-cols-4 gap-5">
              {phim.lstLichChieuTheoPhim
                .slice(0 - 8)
                .map((lichChieu, indexLichChieu) => {
                  return (
                    <div key={indexLichChieu}>
                      <NavLink
                        className="text - white"
                        to={`/ticketroom/${lichChieu.maLichChieu}`}
                      >
                        <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                          <p>
                            {moment(lichChieu.ngayChieuGioChieu).format(
                              "DD-MM-YYYY"
                            )}
                          </p>
                          <p>
                            {moment(lichChieu.ngayChieuGioChieu).format(
                              "h:mm:ss a"
                            )}
                          </p>
                        </button>
                      </NavLink>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      );
    });
  };
  // render hệ thống rạp -> cụm rạp
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
    <div className="container shadow-md p-3 rounded-2 border-2 ">
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
