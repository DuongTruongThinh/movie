import React from "react";
import bgAnimate from "./animation_lna7ol5e.json";
import Lottie from "lottie-react";

export default function Banner() {
  return (
    <div>
      <Lottie animationData={bgAnimate} loop={false} className="w-1/2" />
    </div>
  );
}
