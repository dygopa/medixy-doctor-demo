import clsx from "clsx";

function Main() {
  return (
    <>
      {/* BEGIN: Dark Mode Switcher */}
      <div className="fixed bottom-0 right-0 z-50 flex items-center justify-center w-40 h-12 mb-10 mr-10 border rounded-full shadow-md cursor-pointer box">
        <div className="mr-4 text-slate-600 dark:text-slate-200">Dark Mode</div>
        <div
          className={clsx([
            "border w-[38px] h-[24px] p-px outline-none rounded-full relative cursor-pointer",
            "before:content-[''] before:w-[22px] before:h-[22px] before:transition-all before:duration-200 before:shadow-[1px_1px_3px_rgba(0,0,0,0.25)] before:absolute before:inset-y-0 before:my-auto before:rounded-full",
          ])}
        ></div>
      </div>
      {/* END: Dark Mode Switcher */}
    </>
  );
}

export default Main;
