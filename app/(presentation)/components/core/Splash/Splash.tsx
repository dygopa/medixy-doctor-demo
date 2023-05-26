import Image from "next/image";

export default function Splash() {
  return (
    <div className="w-screen h-screen">
      <div className="flex justify-center items-center w-full h-full">
        <Image
          src="/logo.png"
          width={275}
          height={110}
          alt="App logo white"
          priority
        />
      </div>
    </div>
  );
}
