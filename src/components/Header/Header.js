import React from "react";
import { useSelector } from "react-redux";
import { userLocalStorage } from "../../api/localServices";
import { NavLink } from "react-router-dom";

export default function Header() {
  let { info } = useSelector((state) => {
    return state.userReducer;
  });
  console.log(info);
  let handleLogOut = () => {
    userLocalStorage.remove();
    window.location.reload();
  };
  // login
  let handleLogIn = () => (window.location.href = "/login");
  // register
  let handleRegister = () => (window.location.href = "/register");
  let renderUserNav = () => {
    let classBtn =
      "bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded";
    if (info) {
      return (
        <>
          <NavLink to={`/account/${info.taiKhoan}`} className={classBtn}>
            <span className="mr-2">{info.hoTen}</span>
            <i class="fa-solid fa-user-check"></i>
          </NavLink>
          <button onClick={handleLogOut} className={classBtn}>
            <span className="mr-2">Đăng xuất</span>
            <i class="fa-solid fa-arrow-right-from-bracket"></i>
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
    <div className="h-20 lg:flex items-center justify-between shadow-lg px-20 ">
      <NavLink to="/">
        <span className="text-3xl font-medium text-orange-600">
          <i class="fa-solid fa-film"></i>
          <span className="ml-2">Phim chiếu rạp</span>
        </span>
      </NavLink>
      <div className="space-x-5 font-medium">{renderUserNav()}</div>
    </div>
  );
}
