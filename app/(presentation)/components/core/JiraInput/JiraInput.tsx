import { InputHTMLAttributes, useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import Lucide from "../BaseComponents/Lucide";

interface IJiraInputProps extends InputHTMLAttributes<any> {
  text: string;
  customStyleText: string;
  customType: string;
  loading?: boolean;
  customList?: any[];
  disabledButton?: boolean;
}

export const JiraInput = ({
  text,
  customStyleText,
  customType,
  onChange,
  onClick,
  onFocus,
  onBlur,
  placeholder,
  disabled,
  loading = false,
  customList,
  disabledButton = false,
}: IJiraInputProps) => {
  const [focus, setFocus] = useState(false);
  const [canUpdate, setCanUpdate] = useState(false);

  const wrapperRef = useRef(null);

  function useOutsideAlerter(ref: React.MutableRefObject<any>) {
    useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        if (ref.current && !ref.current.contains(event.target)) {
          setCanUpdate(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  useOutsideAlerter(wrapperRef);

  return (
    <div
      ref={wrapperRef}
      className={twMerge([
        "w-full h-fit relative flex justify-between items-center gap-2",
      ])}
    >
      {canUpdate && !disabledButton && (
        <div
          onClick={onClick}
          className={twMerge([
            "w-6 h-6 flex flex-col justify-center items-center relative bg-white text-slate-900 text-lg rounded p-1 shadow-md cursor-pointer border",
            "absolute right-0 -bottom-5 z-10",
          ])}
        >
          {loading ? (
            <p className="animate-spin p-2">
              <Lucide icon="check-circle-outline" />
            </p>
          ) : (
            <Lucide icon="check-circle-outline" />
          )}
        </div>
      )}
      {canUpdate && (
        <>
          {customType === "text" && (
            <input
              onFocus={() => {
                setFocus(true);
                onFocus;
              }}
              onBlur={() => {
                setFocus(false);
                onBlur;
              }}
              className={twMerge([
                "w-full h-fit relative block p-1 rounded outline-none border border-primary",
                "focus:border focus:border-primary",
                customStyleText,
              ])}
              onChange={onChange}
              placeholder={focus ? "" : placeholder}
              defaultValue={text}
              type="text"
            />
          )}
          {customType === "textarea" && (
            <textarea
              onFocus={() => {
                setFocus(true);
                onFocus;
              }}
              onBlur={() => {
                setFocus(false);
                onBlur;
              }}
              className={twMerge([
                "w-full h-fit relative block p-1 rounded outline-none border border-primary",
                "focus:border focus:border-primary",
                customStyleText,
              ])}
              onChange={onChange}
              placeholder={focus ? "" : placeholder}
              defaultValue={text}
              rows={5}
            ></textarea>
          )}
          {customType === "select" && (
            <select
              className={twMerge([
                "w-full h-fit relative block p-1 rounded outline-none border border-primary",
                "focus:border focus:border-primary",
                customStyleText,
              ])}
              onChange={onChange}
              defaultValue={text}
            >
              <option>{placeholder}</option>
              {customList?.map((elem: any, i: number) => (
                <option key={i} value={elem["id"]}>
                  {elem["value"]}
                </option>
              ))}
            </select>
          )}
        </>
      )}
      {!canUpdate && (
        <span
          onClick={() => {
            !disabled && setCanUpdate(true);
          }}
          className={twMerge([
            "transition w-full relative block rounded p-1",
            !disabled && "hover:bg-slate-200 cursor-pointer",
            customStyleText,
          ])}
        >
          {text.length === 0 ? placeholder : text}
        </span>
      )}
    </div>
  );
};
