import Lucide from "(presentation)/components/core/BaseComponents/Lucide";
import clsx from "clsx";
import { useRouter } from "next/navigation";

interface ISubItem {
  text: string;
}

interface INavItemProps {
  text: string;
  href: string;
  isActive?: boolean;
  subItems?: ISubItem[];
}

export default function NavItem({
  text,
  href,
  subItems = [],
  isActive = false,
}: INavItemProps) {
  const router = useRouter();

  return (
    <div className="py-2 w-full">
      <div className="flex items-center justify-between w-full">
        <div>
          <button
            type="button"
            className={clsx([
              "text-slate-900 text-lg hover:font-bold",
              isActive ? "font-bold" : "font-medium",
            ])}
            onClick={() => router.push(href)}
          >
            {text}
          </button>
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
              <p className="text-md text-slate-500 font-normal">
                {subItem.text}
              </p>
            </div>
          ))}
        <div></div>
      </div>
    </div>
  );
}
