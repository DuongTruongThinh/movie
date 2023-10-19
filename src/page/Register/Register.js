import React from "react";
import Form from "./Form";
import Banner from "./Banner";
export default function Register() {
  return (
    <div className="h-screen bg-orange-600 flex items-center">
      <div className="container bg-white rounded-xl p-10 grid grid-cols-3 ">
        <Banner className="flex items-center"></Banner>
        <div className="col-span-2 flex items-center justify-center">
          <Form></Form>
        </div>
      </div>
    </div>
  );
}
//
//
