import Lucide from "(presentation)/components/core/BaseComponents/Lucide";

interface IOrderProps {
  text: string;
  date: Date;
}

export default function Order({ text, date }: IOrderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <div className="mr-8">
          <p className="text-slate-500 font-normal lg:text-md">
            {new Date(date).getDate()}/{new Date(date).getMonth()}/
            {new Date(date).getFullYear()}
          </p>
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
