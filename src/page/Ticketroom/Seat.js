// SeatList.js
import React, { useEffect, useLayoutEffect, useState } from "react";
import "./ticketroom.css";
export default function Seat(props) {
  const [seats, setSeats] = useState([]);
  let listSeat = props.value;
  useEffect(() => {
    setSeats(listSeat);
  }, [listSeat]);

  let handleSeatClick = (index) => {
    let updatedSeats = [...seats];
    if (seats[index].taiKhoanNguoiDat == "null") {
      updatedSeats[index].taiKhoanNguoiDat = "seat selected"; // Chuyển ghế sang trạng thái đã chọn
    } else if (seats[index].taiKhoanNguoiDat == "seat selected") {
      updatedSeats[index].taiKhoanNguoiDat = "seat"; // Chuyển ghế sang trạng thái trống
    }
    listSeat = updatedSeats;
    setSeats(updatedSeats);
  };

  return (
    <div>
      {/* <h2>Seat List</h2> */}
      <div>
        {seats.map((item, index) => {
          if (item.taiKhoanNguoiDat == null) {
            return (
              <button
                className="seat"
                onClick={() => handleSeatClick(index)}
              ></button>
            );
          } else if (item.taiKhoanNguoiDat == "seat selected") {
            return (
              <button
                className="seat selected"
                onClick={() => handleSeatClick(index)}
              ></button>
            );
          } else {
            return <button className="seat sold"></button>;
          }
        })}
      </div>
    </div>
  );
}
