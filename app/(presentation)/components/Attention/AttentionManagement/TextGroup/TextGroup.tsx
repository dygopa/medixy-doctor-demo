import { twMerge } from "tailwind-merge";

export const TextGroup = ({ label, data, style }: { label: string; data: string; style?: string; }) => {
    return (
        <div className={twMerge([
            "relative flex flex-col justify-center items-start text-left",
            style
        ])}>
            <p className="text-slate-500 font-normal text-xs">{label}</p>
            <p className="text-slate-900 font-normal text-sm">{data}</p>
        </div>
    )
}