import axios from "axios";
import { BASE_URL, configHeaders } from "../../../api/config";
import { SET_INFO } from "../../constant/user";
export let loginAction = (values) => {
  return (dispatch) => {
    axios
      .post(`${BASE_URL}/QuanLyNguoiDung/DangNhap`, values, {
        headers: configHeaders(),
      })
      .then((res) => {
        let action = { type: SET_INFO, payload: res.data };
        dispatch(action);
        // đẩy data xuống local storage
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
