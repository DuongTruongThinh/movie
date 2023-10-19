import React from "react";
import bgAnimate from "./animation_lnt5329x.json";
import Lottie from "lottie-react";

export default function Banner() {
  return (
    <div className="flex items-center justify-center">
      <Lottie animationData={bgAnimate} loop={true} className="h-80" />
    </div>
  );
}
