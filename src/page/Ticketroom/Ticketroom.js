import React, { useEffect, useLayoutEffect, useState } from "react";
import "./ticketroom.css";
import { useParams } from "react-router-dom";
import { getTicketRoom } from "../../api/api";
import Seat from "./Seat";
export default function Ticketroom() {
  const { id } = useParams();
  const [danhSachGhe, setLdanhSachGhe] = useState([]);
  const [thongTinPhim, setThongTinPhim] = useState({});
  // gọi api lấy dữ liệu đặt vé
  useEffect(() => {
    getTicketRoom(id)
      .then((res) => {
        // console.log(res);
        setLdanhSachGhe(res.data.content.danhSachGhe);
        // console.log(danhSachGhe);
        setThongTinPhim(res.data.content.thongTinPhim);
      })
      .catch((err) => {});
  }, []);
  // hiển thị thông tin phim
  let handleThongTinPhim = () => {
    return (
      <div>
        <img src={thongTinPhim.hinhAnh} alt="" className="h-48 object-cover" />
        <div className="m-4">
          <p>Tên phim: {thongTinPhim.tenPhim}</p>
          <p>Cụm rạp: {thongTinPhim.tenCumRap}</p>
          <p>Địa chỉ: {thongTinPhim.diaChi}</p>

          <p>Tên rạp: {thongTinPhim.tenRap}</p>
          <p>Ngày chiếu: {thongTinPhim.ngayChieu}</p>

          <p>Giờ chiếu: {thongTinPhim.gioChieu}</p>
        </div>
      </div>
    );
  };
  return (
    <div className="ticketroom">
      <div className=" flex">{handleThongTinPhim()}</div>
      <ul className="showcase mt-3">
        <li>
          <button className="seat"></button>
          <p>Ghế trống</p>
        </li>
        <li>
          <div className="seat selected" />
          <p>Ghế đang chọn</p>
        </li>
        <li>
          <div className="seat sold" />
          <p>Ghế đã bán</p>
        </li>
      </ul>
      <div className=" flex flex-col items-center ">
        <div className="screen mb-8" />
        <div className="mt-5">
          <div className="container flex flex-wrap  ">
            <div className="container flex flex-wrap justify-center ">
              <Seat value={danhSachGhe}></Seat>
            </div>
          </div>
        </div>
      </div>
      <p className="text">
        You have selected <span id="count">0</span> seat for a price of RS.
        <span id="total">0</span>
      </p>
    </div>
  );
}
