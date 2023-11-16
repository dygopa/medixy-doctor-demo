import Lucide from "(presentation)/components/core/BaseComponents/Lucide";
import clsx from "clsx";

interface ISubItem {
  text: string;
}

interface INavItemProps {
  text: string;
  isActive?: boolean;
  isCompleted?: boolean;
  subItems?: ISubItem[];
  finalStep?: boolean;
  subStep?: boolean;
}

export default function NavItem({
  text,
  subItems = [],
  isActive = false,
  isCompleted = false,
  finalStep = false,
  subStep = false,
}: INavItemProps) {
  return (
    <div className="py-1 w-full">
      <div className="flex items-start">
        <div className="text-center mr-3">
          <div>
            {isCompleted ? (
              <i
                className="fa-solid fa-circle-check text-primary"
                style={{ fontSize: "20px" }}
              />
            ) : (
              <i
                className={clsx([
                  "fa-solid fa-circle-dot",
                  isActive ? "text-primary" : "text-slate-400",
                ])}
                style={{ fontSize: "20px" }}
              />
            )}
          </div>

          {!finalStep && (
            <div className="ml-2 mt-1">
              <div
                className={clsx([
                  "w-[3px] h-[20px]",
                  isCompleted
                    ? "bg-primary"
                    : isActive
                    ? "bg-primary"
                    : "bg-slate-400",
                ])}
              />
            </div>
          )}
        </div>

        <div className="flex items-center justify-between w-full">
          <div>
            <div
              className={clsx([
                "text-slate-900 font-medium",
                subStep ? "text-xs" : "text-md",
              ])}
            >
              {text}
            </div>
          </div>

          {subItems.length > 0 && (
            <div>
              <Lucide icon="ChevronDown" size={25} color="#22345F" />
            </div>
          )}
        </div>

        <div className="ml-4 mt-2">
          {subItems.length > 0 &&
            subItems.map((subItem: ISubItem, i: number) => (
              <div key={i} className="mb-3">
                <p className="text-sm text-slate-500 font-normal">
                  {subItem.text}
                </p>
              </div>
            ))}
          <div></div>
        </div>
      </div>
    </div>
  );
}
