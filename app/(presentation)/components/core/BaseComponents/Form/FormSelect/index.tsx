import { useContext } from "react";
import { formInlineContext } from "../FormInline";
import { twMerge } from "tailwind-merge";

interface FormSelectProps extends React.ComponentPropsWithoutRef<"select"> {
  formSelectSize?: "sm" | "lg";
}

function FormSelect(props: FormSelectProps) {
  const formInline = useContext(formInlineContext);
  const { formSelectSize, ...computedProps } = props;
  return (
    <select
      {...computedProps}
      className={twMerge([
        "disabled:bg-gray-300 disabled:cursor-not-allowed disabled:dark:bg-darkmode-800/50 text-gray-900",
        "[&[readonly]]:bg-gray-300 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-800/50",
        "transition duration-200 ease-in-out w-full accent-primary bg-gray-100 border-none text-sm shadow-sm rounded-md py-2 px-3 pr-8 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-gray-700 dark:focus:ring-opacity-50",
        props.formSelectSize == "sm" && "text-xs py-1.5 pl-2 pr-8 ",
        props.formSelectSize == "lg" && "text-lg py-1.5 pl-4 pr-8 ",
        formInline && "flex-1",
        props.className,
      ])}
    >
      {props.children}
    </select>
  );
}

export default FormSelect;
