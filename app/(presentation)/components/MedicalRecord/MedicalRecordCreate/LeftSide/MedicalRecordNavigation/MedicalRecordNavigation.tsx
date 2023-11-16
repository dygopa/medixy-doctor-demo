import clsx from "clsx";
import Header from "./Header/Header";
import Nav from "./Nav/Nav";

export default function MedicalRecordNavigation() {
  return (
    <div
      className={clsx([
        "h-auto relative",
        "before:content-[''] before:w-[90%] before:shadow-[0px_3px_20px_#0000000b] before:bg-slate-50 bg-slate-50 before:h-full before:mt-3 before:absolute before:rounded-md before:mx-auto before:inset-x-0 before:dark:bg-darkmode-400/70",
      ])}
    >
      <div className="p-4 box h-full">
        {/* <div className="mb-4">
          <Header />
    </div> */}

        <div>
          <Nav />
        </div>
      </div>
    </div>
  );
}
