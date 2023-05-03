import Image from "next/image";
import React from "react";

export default function Side() {
  return (
    <>
      <div className="h-screen absolute w-full ">
        <Image
          src="/static/image/signin-bg.jpg"
          className="max-w-full h-full object-cover "
          fill
          alt="Signin main"
        />
      </div>

      <div
        className="absolute w-full h-full "
        style={{ backgroundColor: "rgba(0, 0, 0, .3)" }}
      >
        <div className="flex justify-center items-center h-full">
          <Image
            src="/logo-white.png"
            width={250}
            height={250}
            alt="App logo"
          />
        </div>
      </div>
    </>
  );
}
