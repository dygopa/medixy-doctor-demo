import Lucide from "(presentation)/components/core/BaseComponents/Lucide";

interface IOrderProps {
  text: string;
}

export default function Order({ text }: IOrderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <div className="mr-8">
          <p className="text-slate-500 font-normal lg:text-md">03/04/2023</p>
        </div>

        <div className="lg:w-auto w-[250px]">
          <p className="text-slate-900 lg:text-md">{text}</p>
        </div>
      </div>

      <div className="flex items-center">
        <div className="mr-14">
          <Lucide icon="FilePlus" color="#cfd0d1" />
        </div>

        <div className="mr-4">
          <Lucide icon="Eye" color="#22345F" />
        </div>
      </div>
    </div>
  );
}
