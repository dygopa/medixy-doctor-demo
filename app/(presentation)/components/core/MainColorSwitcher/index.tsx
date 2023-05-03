import clsx from "clsx";

function Main() {
  return (
    <>
      {/* BEGIN: Main Color Switcher */}
      <div className="fixed bottom-0 right-0 z-50 flex items-center justify-center h-12 px-5 mb-10 border rounded-full shadow-md box mr-52">
        <div className="hidden mr-4 sm:block text-slate-600 dark:text-slate-200">
          Color Scheme
        </div>
        <a
          className={clsx({
            "block w-8 h-8 cursor-pointer bg-emerald-900 rounded-full border-4 mr-1 hover:border-slate-200":
              true,
          })}
        ></a>
        <a
          className={clsx({
            "block w-8 h-8 cursor-pointer bg-blue-800 rounded-full border-4 mr-1 hover:border-slate-200":
              true,
          })}
        ></a>
        <a
          className={clsx({
            "block w-8 h-8 cursor-pointer bg-blue-900 rounded-full border-4 mr-1 hover:border-slate-200":
              true,
          })}
        ></a>
        <a
          className={clsx({
            "block w-8 h-8 cursor-pointer bg-cyan-900 rounded-full border-4 mr-1 hover:border-slate-200":
              true,
          })}
        ></a>
        <a
          className={clsx({
            "block w-8 h-8 cursor-pointer bg-indigo-900 rounded-full border-4 hover:border-slate-200":
              true,
          })}
        ></a>
      </div>
      {/* END: Main Color Switcher */}
    </>
  );
}

export default Main;
