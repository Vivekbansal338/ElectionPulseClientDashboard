import React from "react";
import Lottie from "lottie-react";

const LottieIcon = ({
  source,
  width,
  height,
  autoplay = true,
  loop = true,
  ...props
}) => {
  return (
    <Lottie
      animationData={source} // changed from source to animationData
      style={{ width, height }}
      autoplay={autoplay}
      loop={loop}
      {...props}
    />
  );
};

export default LottieIcon;
