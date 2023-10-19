// import React, { useEffect, useState } from "react";
// import { Tabs } from "antd";
// import { getShowtime } from "../../api/api";
// import moment from "moment";
// const onChange = (key) => {
//   console.log(key);
// };
// // const items = [
// //   {
// //     key: "1",
// //     label: "Tab 1",
// //     children: "Content of Tab Pane 1",
// //   },
// //   {
// //     key: "2",
// //     label: "Tab 2",
// //     children: "Content of Tab Pane 2",
// //   },
// //   {
// //     key: "3",
// //     label: "Tab 3",
// //     children: "Content of Tab Pane 3",
// //   },
// // ];
// export default function TabMovie(props) {
//   const { id } = props;
//   const [danhSachHeThongRap, setDanhSachHeThongRap] = useState([]);
//   useEffect(() => {
//     getShowtime(id)
//       .then((res) => {
//         // console.log(
//         //   "🚀 ~ file: TabMovie.js:30 ~ .then ~ res:",
//         //   res.data.content
//         // );
//         setDanhSachHeThongRap(res.data.content);
//       })
//       .catch((err) => {});
//   }, []);
//   console.log(danhSachHeThongRap.heThongRapChieu);
//   let renderLichChieu = (lichChieuPhim) => {
//     return lichChieuPhim.map((suatChieu) => {
//       return (
//         <span className="bg-red-500 text-white px-5 py-2">
//           {moment(suatChieu.ngayChieuGioChieu).format("LLLL")}
//         </span>
//       );
//     });
//   };
//   let handleHeThongRap = () => {
//     return danhSachHeThongRap.heThongRapChieu.map((heThongRap, index) => {
//       return {
//         key: index,
//         label: <img className="w-16" src={heThongRap.logo}></img>,
//         children: (
//           <Tabs
//             style={{ height: 500 }}
//             tabPosition="left"
//             items={heThongRap.cumRapChieu.map((cumRap) => {
//               return {
//                 key: cumRap.tenCumRap,
//                 label: (
//                   <div className="text-left w-96 whitespace-normal">
//                     <p className="text-green-700 font-medium hover:text-blue-800">
//                       {cumRap.tenCumRap}{" "}
//                     </p>
//                     <p>{cumRap.diaChi}</p>
//                   </div>
//                 ),
//                 children: (
//                   <div style={{ height: 500, overflow: "scroll" }}>
//                     {renderLichChieu(cumRap.lichChieuPhim)}
//                   </div>
//                 ),
//               };
//             })}
//           ></Tabs>
//         ),
//       };
//     });
//   };

//   return (
//     <div className="container shadow-md p-3 rounded-2 border-2">
//       <Tabs
//         defaultActiveKey="1"
//         items={handleHeThongRap()}
//         onChange={onChange}
//         tabPosition="left"
//       />
//       {/* <div>{danhSachHeThongRap}</div> */}
//     </div>
//   );
// }
// /*
// key: index,
//         label: <img className="w-16" src={heThongRap.logo}></img>,
//         children:
// */
