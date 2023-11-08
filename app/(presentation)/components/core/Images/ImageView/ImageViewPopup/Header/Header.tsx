import Lucide from "(presentation)/components/core/BaseComponents/Lucide";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

interface IHeaderProps {
  setShowImageViewPopup: Dispatch<SetStateAction<boolean>>;
}

export default function Header({ setShowImageViewPopup }: IHeaderProps) {
  return (
    <div className="flex justify-between items-center w-full">
      <div>
        <div className="h-[70px] px-3 sm:px-8 flex items-center">
          <Image
            src="/logo-white.png"
            width={175}
            height={175}
            alt="App logo"
          />
        </div>
      </div>

      <div>
        <button onClick={() => setShowImageViewPopup(false)}>
          <Lucide icon="X" color="#fff" size={40} />
        </button>
      </div>
    </div>
  );
}
