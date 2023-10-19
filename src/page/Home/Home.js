import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import ListMovie from "./ListMovie/ListMovie";
import TabMovie from "./TabMovie/TabMovie";
import Slider from "./Slider/Slider";

export default function Home() {
  let navigate = useNavigate();

  return (
    <div className="space-y-10">
      <Slider></Slider>
      <ListMovie></ListMovie>
      <TabMovie></TabMovie>
    </div>
  );
}
