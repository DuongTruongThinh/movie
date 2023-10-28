import axios from "axios";
import { BASE_URL, configHeaders } from "./config";

export let getListMovie = () => {
  return axios({
    url: `${BASE_URL}/QuanLyPhim/LayDanhSachPhim?maNhom=GP09`,
    method: "GET",
    data: null,
  });
};
export let getDetailMovie = (id) => {
  return axios({
    url: `${BASE_URL}/QuanLyPhim/LayThongTinPhim?MaPhim=${id}`,
    method: "GET",
    data: null,
  });
};
export let getMovieByTheater = () => {
  return axios({
    url: `${BASE_URL}/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=GP09`,
    method: "GET",
    data: null,
  });
};
export let getDataSlider = () => {
  return axios({
    url: `https://movienew.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachBanner`,
    method: "GET",
    headers: configHeaders(),
  });
};
export let getShowtime = (id) => {
  return axios({
    url: `${BASE_URL}/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${id}`,
    method: "GET",
    data: null,
  });
};
export let getTicketRoom = (id) => {
  return axios({
    url: `${BASE_URL}/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${id}`,
    method: "GET",
    data: null,
  });
};
export let datVe = (gheDat) => {
  return axios({
    url: `${BASE_URL}/QuanLyDatVe/DatVe`,
    method: "POST",
    data: gheDat,
    headers: {
      Authorization:
        "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYWJjZGVmdWlpaSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IktoYWNoSGFuZyIsIm5iZiI6MTY5ODQxNTQzOSwiZXhwIjoxNjk4NDE5MDM5fQ.iioIljf-nehVhFCeeJQQETk-zh1B5dnhFEyXFNbgZK4",
    },
  });
};
export let getAccount = (id) => {
  return axios({
    url: `${BASE_URL}/QuanLyNguoiDung/ThongTinTaiKhoan`,
    method: "POST",
    data: { taiKhoan: id },
  });
};
// https://movie0706.cybersoft.edu.vn/api/QuanLyDatVe/DatVe
// https://movie0706.cybersoft.edu.vn/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=46108

// https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/ThongTinTaiKhoan
// https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=GP09&tuKhoa=Velit+deleniti+quae+
