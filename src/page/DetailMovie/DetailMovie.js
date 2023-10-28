import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { getDetailMovie, getMovieByTheater, getShowtime } from "../../api/api";
import { Progress, Rate, Tabs } from "antd";
import moment from "moment";
import ReactPlayer from "react-player";
import VideoPopup from "../../components/VideoPopup/VideoPopup";
// import TabMovie2 from "./TabMovie2";
export default function DetailMovie() {
  // useParams -> lấy id từ url
  let params = useParams();
  const [detail, setdeTail] = useState({});
  console.log("🚀 ~ file: DetailMovie.js:13 ~ DetailMovie ~ detail:", detail);
  const [lichChieu, setlichChieu] = useState([]);
  // gọi api lấy chi tiết phim dựa vào id
  useEffect(
    () => {
      getDetailMovie(params.id)
        .then((res) => {
          setdeTail(res.data);
          setlichChieu(res.data.lichChieu);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    { detail }
  );
  // danh sách hệ thống rạp
  let uniqueHeThongRap = [
    ...new Set(lichChieu.map((item) => item.thongTinRap.maHeThongRap)),
  ];
  let cumRapTheoHeThong = uniqueHeThongRap.map((maHeThong) => {
    // danh sách cụm rạp theo hệ thống
    return {
      maHeThong: maHeThong,
      lstCumRap: lichChieu.map((suatChieu) => {
        if (suatChieu.thongTinRap.maHeThongRap == maHeThong) {
          return suatChieu.thongTinRap.tenCumRap;
        }
      }),
    };
  });
  let uniqueCumRapTheoHeThong = cumRapTheoHeThong.map((heThong) => ({
    ...heThong,
    lstCumRap: [
      ...new Set(heThong.lstCumRap.filter((cumRap) => cumRap !== undefined)),
    ],
  }));
  // render hệ thống rạp và lịch chiếu
  const [danhSachHeThongRap, setDanhSachHeThongRap] = useState([]);
  useEffect(() => {
    getMovieByTheater()
      .then((res) => {
        setDanhSachHeThongRap(res.data);
      })
      .catch((err) => {});
  }, []);

  // Tìm hình ảnh logo
  let logo = (heThongRap) => {
    let objTimDuoc = danhSachHeThongRap.find((item) => {
      return item.maHeThongRap == heThongRap.maHeThong;
    });

    if (objTimDuoc) {
      let logoHeThong = objTimDuoc.logo;
      return logoHeThong;
    }
  };
  // Tìm địa chỉ cụm rạp
  let diaChi = (heThongRap, cumRap) => {
    let heThongTimDuoc = danhSachHeThongRap.find((item) => {
      return item.maHeThongRap == heThongRap.maHeThong;
    });

    let diaChiCumRap = "";
    if (typeof heThongTimDuoc !== "undefined") {
      let cumRapTimDuoc = heThongTimDuoc.lstCumRap.find((item) => {
        return (item.maCumRap = cumRap);
      });
      diaChiCumRap = cumRapTimDuoc.diaChi;
    }
    return diaChiCumRap;
  };
  //
  const onChange = (key) => {};
  let handleHeThongRap = () => {
    return uniqueCumRapTheoHeThong.map((heThongRap, index) => {
      return {
        key: index,
        label: <img className="w-16" src={logo(heThongRap)}></img>,
        children: (
          <Tabs
            style={{ height: 500 }}
            tabPosition="left"
            items={heThongRap.lstCumRap.map((cumRap, idCumRap) => {
              return {
                key: idCumRap,
                label: (
                  <div className="text-left w-96 whitespace-normal">
                    <p className="text-green-700 font-medium hover:text-blue-800">
                      {cumRap}
                    </p>
                    <p>{diaChi(heThongRap, cumRap)}</p>
                  </div>
                ),
                // style={{ height: 500, overflow: "scroll" }
                children: (
                  <div className="flex flex-wrap">
                    {renderDsLichChieu(heThongRap, cumRap)}
                  </div>
                ),
              };
            })}
          ></Tabs>
        ),
      };
    });
  };
  let renderDsLichChieu = (heThongRap, cumRap) => {
    return lichChieu.map((suatChieu, idSuatChieu) => {
      if (
        suatChieu.thongTinRap.maHeThongRap == heThongRap.maHeThong &&
        suatChieu.thongTinRap.tenCumRap == cumRap
      ) {
        return (
          <div key={idSuatChieu} className="m-3">
            <NavLink to={`/ticketroom/${suatChieu.maLichChieu}`}>
              <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                <p>
                  {moment(suatChieu.ngayChieuGioChieu).format("DD-MM-YYYY")}
                </p>
                <p>{moment(suatChieu.ngayChieuGioChieu).format("h:mm:ss a")}</p>
              </button>
            </NavLink>
          </div>
        );
      }
    });
  };

  return (
    <div>
      <div className="container flex mb-3">
        <div className="w-1/2 px-10">
          <div className="space-y-5 ">
            <p className="text-orange-700 font-medium">
              Tên phim: {detail.tenPhim}
            </p>
            <p>
              Ngày khởi chiếu:{" "}
              {moment(detail.ngayKhoiChieu).format("DD-MM-YYYY")}
            </p>
            <p>Mô tả: {detail.moTa}</p>
            <p className=" block">Điểm đánh giá: {detail.danhGia}/10</p>
            <VideoPopup link={detail.trailer}></VideoPopup>
          </div>
        </div>
        <div className="w-1/2 flex  justify-start items-center ">
          <img className="h-96 mb-10" src={detail.hinhAnh} alt="" />
        </div>
      </div>
      <div className="container shadow-md p-3 rounded-2 border-2">
        <Tabs
          style={{ height: 500 }}
          tabPosition="left"
          defaultActiveKey="1"
          items={handleHeThongRap()}
          onChange={onChange}
        />
      </div>
    </div>
  );
}
