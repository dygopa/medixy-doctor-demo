import Image from "next/image";

export default function TopBarDiscover() {
  return (
    <div className="sticky top-0 left-0 z-20 box-border w-full bg-white h-[75px] border-b flex justify-center items-center">
      <div className="w-full h-full py-2">
        <div className="flex justify-center">
          <Image src="/images/logo.png" width={200} height={150} alt="" />
        </div>
      </div>
    </div>
  );
}
