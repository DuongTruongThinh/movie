import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import ListMovie from "./ListMovie/ListMovie";
import TabMovie from "./TabMovie/TabMovie";
import Slider from "./Slider/Slider";
import Footer from "../Footer/Footer";

export default function Home() {
  let navigate = useNavigate();

  return (
    <div>
      <Header></Header>
      <Slider></Slider>
      <div className="space-y-10">
        <ListMovie></ListMovie>
        <TabMovie></TabMovie>
        <Footer></Footer>
      </div>
    </div>
  );
}
