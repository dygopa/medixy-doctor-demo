import Button from "(presentation)/components/core/BaseComponents/Button";
import Lucide from "(presentation)/components/core/BaseComponents/Lucide";
import Image from "next/image";

export default function Consultation({ data }: any) {
  return (
    <div className="w-full cursor-pointer border-slate-200 flex justify-between gap-4 rounded-md overflow-hidden">
      <div className="rounded-md w-[42px]  block overflow-hidden">
        <Image
          className="rounded-full object-cover"
          src={data["pic_profile"]}
          alt="profile-picture"
          width={75}
          height={75}
        />
      </div>
      <div className="relative w-[83%] h-full flex flex-col justify-center items-start">
        <div className="flex justify-between items-center w-full">
          <p className="font-semibold text-lg text-primary">{data["user"]}</p>
          <div className="flex items-center">
            <p className="font-semibold text-md text-slate-900 mr-3">
              {data["hour"]}
            </p>

            <Button variant="outline-dark" className="border-0">
              <Lucide icon="Trash" size={20} />
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center w-full">
          <p className="font-light text-sm text-slate-400">{data["service"]}</p>
        </div>

        <div className="mt-4">
          <div className="flex justify-start items-center gap-2">
            <span className="py-2 px-2 rounded-md bg-warning">Por atender</span>
          </div>
        </div>
      </div>
    </div>
  );
}
