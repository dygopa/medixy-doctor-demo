import { twMerge } from "tailwind-merge";

interface ITooltipsProps {
  children: any;
  className?: any;
  white?: boolean;
  position?: string;
}

export default function Tooltip({children, className, white = false, position = "top"}:ITooltipsProps) {
  return (
    <div className={twMerge([
      `group-hover:scale-100 scale-0 transition-all block absolute z-[100] w-auto max-w-[250px] shadow-md p-3 text-sm rounded-md`,
      white ? "bg-white bg-opacity-80 text-black" : "bg-gray-800 text-gray-100",
      position === "top" && "bottom-7",
      position === "bottom" && "top-7",
      className,
    ])}>
      {children}
    </div>
  )
}