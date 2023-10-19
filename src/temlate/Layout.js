import React from "react";
import Header from "../components/Header/Header";
import Footer from "../page/Footer/Footer";

export default function Layout({ children }) {
  return (
    <div className="space-y-10">
      <Header></Header>
      {children}
      <Footer></Footer>
    </div>
  );
}
