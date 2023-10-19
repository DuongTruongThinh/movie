import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDetailMovie, getShowtime } from "../../api/api";
import { Progress } from "antd";
import TabMovie2 from "./TabMovie2";
// import TabMovie2 from "./TabMovie2";
export default function DetailMovie() {
  // useParams -> lấy id từ url
  let params = useParams();
  const [detail, setdeTail] = useState({});
  // gọi api lấy chi tiết phim dựa vào id
  useEffect(
    () => {
      getDetailMovie(params.id)
        .then((res) => {
          console.log(res);
          setdeTail(res.data.content);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    { detail }
  );
  return (
    <div>
      <div className="container flex justify-between items-center mb-3">
        <img className="h-1/3" src={detail.hinhAnh} alt="" />
        <p>{detail.tenPhim}</p>
        <Progress
          type="circle"
          size={200}
          strokeColor={"red"}
          strokeWidth={20}
          format={(percent) => (
            <span className="text-red-600 font-medium animate-bounce block">
              {percent / 10} Điểm
            </span>
          )}
          percent={detail.danhGia * 10}
        />
      </div>
      <div className="mt-10">
        <TabMovie2 id={params.id}></TabMovie2>
      </div>
    </div>
  );
}
