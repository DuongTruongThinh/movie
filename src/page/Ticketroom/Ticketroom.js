import React, { useEffect, useLayoutEffect, useState } from "react";
import "./ticketroom.css";
import { useParams } from "react-router-dom";
import { datVe, getTicketRoom } from "../../api/api";
import { useSelector } from "react-redux";
import { message } from "antd";
export default function Ticketroom() {
  const { id } = useParams();
  const [danhSachGhe, setLdanhSachGhe] = useState([]);
  console.log(
    "🚀 ~ file: Ticketroom.js:10 ~ Ticketroom ~ danhSachGhe:",
    danhSachGhe
  );
  const [thongTinPhim, setThongTinPhim] = useState({});
  const [selected, setSelected] = useState([]);
  let { info } = useSelector((state) => {
    return state.userReducer;
  });
  // gọi api lấy dữ liệu đặt vé
  useEffect(() => {
    getTicketRoom(id)
      .then((res) => {
        res.data.danhSachGhe.map((item, index) => {
          if (item.taiKhoanNguoiDat == null) {
            item.isSold = false;
          } else {
            item.isSold = true;
          }
        });
        setLdanhSachGhe(res.data.danhSachGhe);
        setThongTinPhim(res.data.thongTinPhim);
      })
      .catch((err) => {});
  }, []);
  // hiển thị thông tin phim
  let handleThongTinPhim = () => {
    return (
      <div className="flex">
        <img
          src={thongTinPhim.hinhAnh}
          alt=""
          className="h-48 object-cover m-3"
        />
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
  // xác định loại ghế
  let loaiGhe = (item, index) => {
    if (item.isSold == true) {
      return "seat sold";
    } else if (selected.indexOf(index) !== -1) {
      return "seat selected";
    } else return "seat";
  };
  // render danh sách ghế
  let handleDanhSachGhe = () => {
    return danhSachGhe.map((item, index) => {
      let classNameButton = loaiGhe(item, index);
      return (
        <button
          key={index}
          className={classNameButton}
          onClick={() => handleSeatClick(index)}
        ></button>
      );
    });
  };
  // click vào ghế
  let handleSeatClick = (index) => {
    if (selected.indexOf(index) !== -1) {
      let newSelected = [...selected];
      let updateSelected = newSelected.filter((item) => item !== index);
      setSelected(updateSelected);
    } else if (danhSachGhe[index].isSold == false) {
      let updateSelected = [...selected];
      updateSelected.push(index);
      setSelected(updateSelected);
    } else {
      message.error("Ghế đã bán, vui lòng chọn ghế khác");
    }
  };
  //tính tiền
  let tongTien = 0;
  for (let i = 0; i < selected.length; i++) {
    let viTri = selected[i];
    let giaVe = parseInt(danhSachGhe[viTri].giaVe, 10);
    tongTien = tongTien + giaVe;
  }
  // xác nhận đặt vé
  let handleXacNhanDatVe = () => {
    if (info) {
      let gheDat = {
        maLichChieu: id,
        danhSachVe: selected.map((item) => {
          return danhSachGhe[item];
        }),
        taiKhoanNguoiDung: info.taiKhoan,
      };
      datVe(gheDat)
        .then((res) => {
          console.log(res);
          getTicketRoom(id)
            .then((res) => {
              res.data.danhSachGhe.map((item, index) => {
                if (item.taiKhoanNguoiDat == null) {
                  item.isSold = false;
                } else {
                  item.isSold = true;
                }
              });
              setLdanhSachGhe(res.data.danhSachGhe);
            })
            .catch((err) => {});
        })
        .catch((err) => {
          console.log(err);
        });
      message.success("Đặt thành công, kiểm tra ghế đã đặt ở tài khoản");
    } else {
      message.error("Vui lòng đăng nhập để xác nhận đặt vé");
    }
  };
  // render tiketroom
  return (
    <div className="ticketroom">
      <div className=" flex">{handleThongTinPhim()}</div>
      <ul className="showcase mt-3">
        <li>
          <button className="seat"></button>
          <p className="text-white">Ghế trống</p>
        </li>
        <li>
          <div className="seat selected" />
          <p className="text-white">Ghế đang chọn</p>
        </li>
        <li>
          <div className="seat sold" />
          <p className="text-white">Ghế đã bán</p>
        </li>
      </ul>
      <div className=" flex flex-col items-center ">
        <div className="screen mb-8" />
        <p>Màn hình</p>
        <div className="mt-5">
          <div className="container flex flex-wrap  ">
            <div className="container  ">
              <div className="flex flex-wrap justify-center">
                {handleDanhSachGhe()}
              </div>
            </div>
          </div>
        </div>
      </div>
      <p>
        Chọn:{" "}
        {selected.map((item, index) => {
          return (
            <span key={index} className="mr-2">
              Ghế {item}
            </span>
          );
        })}
      </p>
      <p>
        Tạm tính: <span>{tongTien} VND</span>
      </p>
      <button
        onClick={handleXacNhanDatVe}
        className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
      >
        Xác nhận đặt vé
      </button>
    </div>
  );
}
