import React from "react";
import { useSelector } from "react-redux";
import { userLocalStorage } from "../../api/localServices";
import { NavLink } from "react-router-dom";

export default function Header() {
  let { info } = useSelector((state) => {
    return state.userReducer;
  });
  let handleLogOut = () => {
    userLocalStorage.remove();
    window.location.reload();
  };
  // login
  let handleLogIn = () => (window.location.href = "/login");
  // register
  let handleRegister = () => (window.location.href = "/register");
  let renderUserNav = () => {
    let classBtn = "border-2 border-black rounded-xl px-7 py-3";
    if (info) {
      return (
        <>
          <span>{info.hoTen}</span>
          <button onClick={handleLogOut} className={classBtn}>
            Đăng xuất
          </button>
        </>
      );
    } else {
      return (
        <>
          <button onClick={handleLogIn} className={classBtn}>
            Đăng nhập
          </button>
          <button className={classBtn} onClick={handleRegister}>
            Đăng ký
          </button>
        </>
      );
    }
  };

  return (
    <div className="h-20 flex items-center justify-between shadow-lg px-20">
      <NavLink to="/">
        <span className="text-3xl font-medium text-red-600 animate-pulse">
          Cyber Flix
        </span>
      </NavLink>
      <div className="space-x-5">{renderUserNav()}</div>
    </div>
  );
}
