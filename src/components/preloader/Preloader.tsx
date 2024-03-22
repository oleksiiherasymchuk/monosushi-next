import React from "react";
import preloader from "../../../public/images/preloader.svg";
import Image from "next/image";

const style = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "100%",
};

const Preloader = () => {
  return (
    <div style={style}>
      <Image
        src={preloader}
        alt="preloading"
        priority
        style={{ width: "30%", height: "30%" }}
      />
    </div>
  );
};

export default Preloader;
