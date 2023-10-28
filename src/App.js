import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./page/Home/Home";
import Login from "./page/Login/Login";
import DetailMovie from "./page/DetailMovie/DetailMovie";
import Layout from "./temlate/Layout";
import Register from "./page/Register/Register";
import Ticketroom from "./page/Ticketroom/Ticketroom";
import Account from "./page/Account/Account";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/register" element={<Register></Register>}></Route>
        <Route
          path="/movie/:id"
          element={
            <Layout>
              <DetailMovie></DetailMovie>
            </Layout>
          }
        ></Route>

        <Route
          path="/ticketroom/:id"
          element={
            <Layout>
              <Ticketroom></Ticketroom>
            </Layout>
          }
        ></Route>
        <Route
          path="/account/:id"
          element={
            <Layout>
              <Account></Account>
            </Layout>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
