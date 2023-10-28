import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAccount, getListMovie } from "../../api/api";
import { Card } from "antd";
import moment from "moment";

export default function Account() {
  const { id } = useParams();
  const [lstVe, setLstVe] = useState({});
  const [lstPhim, setLstPhim] = useState({});
  useEffect(() => {
    getAccount(id)
      .then((res) => {
        setLstVe(res.data.thongTinDatVe);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    getListMovie()
      .then((res) => {
        setLstPhim(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const gridStyle = {
    width: "50%",
    textAlign: "center",
  };
  // render danh sách ghế
  let renderDanhSachGhe = (danhSachGhe) => {
    return danhSachGhe.map((ghe, idGhe) => {
      if (idGhe < danhSachGhe.length - 1) {
        return <span key={idGhe}>{ghe.tenGhe}, </span>;
      } else {
        return <span key={idGhe}>{ghe.tenGhe} </span>;
      }
    });
  };
  // render hình ảnh phim
  let hinhAnhPhim = (tenPhim) => {
    return lstPhim.map((phim) => {
      if (phim.tenPhim == tenPhim) {
        return <img src={phim.hinhAnh} className="h-40"></img>;
      }
    });
  };
  // render list vé
  let renderLstVe = () => {
    if (lstVe.length > 0) {
      return lstVe.map((item, index) => {
        return (
          <Card.Grid style={gridStyle} key={index}>
            <div className="flex justify-around">
              <div className="flex items-center justify-center w-1/2">
                {hinhAnhPhim(item.tenPhim)}
              </div>
              <div className="text-left w-1/2">
                <p>Tên phim: {item.tenPhim}</p>
                <p>Ngày đặt: {moment(item.ngayDat).format("DD-MM-YYYY")}</p>
                <p>Giờ đặt: {moment(item.ngayDat).format("h:mm:ss a")}</p>
                <p>Thời lượng phim: {item.thoiLuongPhim}</p>
                <p>Hệ thống rạp: {item.danhSachGhe[0].tenHeThongRap}</p>
                <p>Cụm rạp: {item.danhSachGhe[0].tenCumRap}</p>
                <p>Số ghế đã đặt: {renderDanhSachGhe(item.danhSachGhe)} </p>
              </div>
            </div>
          </Card.Grid>
        );
      });
    }
  };
  let vePhim = () => (
    <Card title="Lịch sử đặt vé" className="text-left">
      {/* <Card.Grid style={gridStyle}>Content</Card.Grid> */}
      {renderLstVe()}
    </Card>
  );
  return <div>{vePhim()}</div>;
}
//
