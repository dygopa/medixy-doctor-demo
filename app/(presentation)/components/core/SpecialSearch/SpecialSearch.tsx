import React, {
  MouseEventHandler,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { twMerge } from "tailwind-merge";
import { Variants, motion } from "framer-motion";
import { FormInput } from "../BaseComponents/Form";
import Link from "next/link";
import Button from "../BaseComponents/Button";
import Lucide from "../BaseComponents/Lucide";

interface SpecialSearchProps {
  selectedItem: any;
  customClick: Function;
  customClickEmpty: any;
  list: any[];
  placeholder?: string | any;
  createButton?: boolean;
}

interface SpecialSelectProps {
  selectedItem?: SearchValue;
  customClick: Function;
  customClickEmpty?: any;
  emptySelectedValue?: any;
  list: SearchValue[];
  placeholder?: string | any;
  disabled?: boolean | undefined;
}

interface ValueOnListProps {
  isSelected: Boolean;
  data: any;
  customClick: Function;
}

interface EmptyStateProps {
  customClickEmpty: any;
  createButton: boolean;
}

interface SearchValue {
  id: number | string;
  title: string;
  description: string;
  color?: string;
}

const ValueOnList = ({ customClick, data, isSelected }: ValueOnListProps) => {
  return (
    <div
      onClick={() => {
        customClick(data);
      }}
      className={twMerge([
        "transition w-full h-[10vh] cursor-pointer flex justify-between items-center gap-3 p-3 bg-white hover:bg-slate-200",
      ])}
    >
      <div className="w-12 h-12 overflow-hidden rounded-lg bg-primary/20 text-primary text-lg flex flex-col justify-center items-center">
        {data["type"] === "SERVICE" && <Lucide icon="briefcase-outline" />}
        {data["type"] === "PATIENT" && <Lucide icon="account" />}
        {data["type"] === "LOCALITY" && (
          <Lucide icon="office-building-outline" />
        )}
      </div>
      <div className="w-[90%] h-full flex flex-col justify-center items-start">
        <p className="font-semibold text-gray-950 text-[0.9rem]">
          {data["title"]}
        </p>
        <p className="font-light text-gray-600 text-sm">
          {data["description"]}
        </p>
      </div>
    </div>
  );
};

const EmptyList = ({ customClickEmpty, createButton }: EmptyStateProps) => {
  return (
    <div className="w-full text-center h-full flex flex-col justify-center items-center gap-2 p-4">
      <p className="font-semibold text-lg text-slate-950 w-[50%]">
        Sin resultados
      </p>
      <p className="font-light text-sm text-slate-500 w-[70%]">
        Tal parece que no hay resultados en tu busqueda, lo sentimos
      </p>
      {createButton && (
        <div className="mt-3">
          <Link href="/patients/new-patient">
            <Button variant="primary">Crear paciente</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default function SpecialSearch({
  customClick,
  customClickEmpty,
  list,
  placeholder,
  selectedItem,
  createButton = false,
}: SpecialSearchProps) {
  const [active, setActive] = useState(false);
  const searchbox: Variants = {
    active: { translateY: 0, opacity: 1, visibility: "visible" },
    disabled: { translateY: 10, opacity: 0, visibility: "hidden" },
  };

  let [searchedList, setSearchedList] = useState(list);

  function handleSearch(value: string) {
    if (value !== "") {
      let l = list;
      l = l.filter(
        (elem) =>
          elem["title"].toLowerCase().includes(value.toLocaleLowerCase()) ||
          elem["description"].toLowerCase().includes(value.toLocaleLowerCase())
      );
      setSearchedList(l);
    } else {
      setSearchedList(list);
    }
  }

  useMemo(() => {
    if (list) setSearchedList(list);
  }, [list]);

  return (
    <div className={twMerge(["w-full h-full relative block"])}>
      <FormInput
        type="text"
        onBlur={() =>
          setTimeout(() => {
            setActive(false);
          }, 500)
        }
        onFocus={() => setActive(true)}
        className="w-full form-control"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
      />
      <motion.div
        variants={searchbox}
        animate={active ? "active" : "disabled"}
        className={twMerge([
          "absolute top-10 right-0 w-full bg-white border rounded-md border-slate-100 shadow-md z-[20]",
        ])}
      >
        <div className="max-h-[30vh] h-fit overflow-y-auto">
          {searchedList.length === 0 ? (
            <EmptyList
              customClickEmpty={customClickEmpty}
              createButton={createButton}
            />
          ) : (
            searchedList.map((elem, i) => (
              <ValueOnList
                key={i}
                data={elem}
                isSelected={selectedItem === elem}
                customClick={customClick}
              />
            ))
          )}
        </div>
      </motion.div>
    </div>
  );
}

export function SpecialSelect({ ...props }: SpecialSelectProps) {
  const [active, setActive] = useState(false);
  const [activeValue, setActiveValue] = useState({} as SearchValue);

  const searchbox: Variants = {
    active: { translateY: 0, opacity: 1, visibility: "visible" },
    disabled: { translateY: 10, opacity: 0, visibility: "hidden" },
  };

  const wrapperRef = useRef(null);

  function useOutsideAlerter(ref: React.MutableRefObject<any>) {
    useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        if (ref.current && !ref.current.contains(event.target)) {
          setActive(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  useOutsideAlerter(wrapperRef);

  const EmptyList = () => {
    return (
      <div className="w-full text-center h-full flex flex-col justify-center items-center gap-2 p-2">
        <p className="font-semibold text-lg text-slate-950 w-[50%]">
          Sin resultados
        </p>
        <p className="font-light text-sm text-slate-500 w-[70%]">
          Tal parece que no hay valores, lo sentimos
        </p>
      </div>
    );
  };

  const ValueOnList = ({
    props,
    customClick,
  }: {
    props: SearchValue;
    customClick: Function;
  }) => {
    return (
      <div
        onClick={() => {
          customClick(props);
        }}
        className={twMerge([
          "transition relative w-full h-fit cursor-pointer justify-center items-start bg-white hover:bg-slate-200 p-2",
        ])}
      >
        <p className="block whitespace-nowrap font-medium text-gray-950 text-[0.9rem] w-full overflow-hidden text-ellipsis">
          {props.title}
        </p>
        <p className="block whitespace-nowrap font-light text-gray-500 text-[0.8rem] w-full max-w-[90%] overflow-hidden text-ellipsis">
          {props.description}
        </p>
      </div>
    );
  };

  useMemo(() => {
    if (props.selectedItem) setActiveValue(props.selectedItem);
  }, [props.selectedItem]);

  return (
    <div className={twMerge(["min-w-[4rem] w-full relative block"])}>
      <div
        onClick={() => {
          setActive(true);
        }}
        className={twMerge([
          "transition relative w-full h-fit cursor-pointer justify-center items-start bg-white border border-slate-300 rounded-md p-2",
        ])}
      >
        <div className="flex items-center justify-between">
          <div className="w-full">
            <p className="block whitespace-nowrap font-medium text-gray-950 text-[0.9rem] w-full overflow-hidden text-ellipsis max-w-[200px]">
              {activeValue.title
                ? activeValue.title
                : props.emptySelectedValue
                ? props.emptySelectedValue["title"]
                : "Nada aún"}
            </p>
            <p className="block whitespace-nowrap font-light text-gray-500 text-[0.8rem] w-full overflow-hidden text-ellipsis max-w-[200px]">
              {activeValue.description
                ? activeValue.description
                : props.emptySelectedValue
                ? props.emptySelectedValue["description"]
                : "Selecciona un valor de la lista"}
            </p>
          </div>

          <div>
            <i
              className={
                active ? "fa-solid fa-chevron-up" : "fa-solid fa-chevron-down"
              }
            />
          </div>
        </div>
      </div>
      {!props.disabled && (
        <motion.div
          ref={wrapperRef}
          variants={searchbox}
          animate={active ? "active" : "disabled"}
          className={twMerge([
            "absolute top-full right-0 w-full block bg-white border rounded-md border-slate-100 shadow-md z-[20]",
          ])}
        >
          <div className="max-h-[30vh] w-full relative overflow-hidden h-fit overflow-y-auto">
            {props.list.length === 0 ? (
              <EmptyList />
            ) : (
              props.list.map((elem: SearchValue, i) => {
                return (
                  <div
                    key={i}
                    onClick={() => {
                      setActiveValue(elem);
                      props.customClick(elem);
                      setActive(false);
                    }}
                    className={twMerge([
                      "transition relative w-full h-fit cursor-pointer justify-center items-start bg-white hover:bg-slate-200 p-2",
                    ])}
                  >
                    <p className="block whitespace-nowrap font-medium text-gray-950 text-[0.9rem] w-full overflow-hidden text-ellipsis">
                      {elem.title}
                    </p>
                    <p className="block whitespace-nowrap font-light text-gray-500 text-[0.8rem] w-full max-w-[90%] overflow-hidden text-ellipsis">
                      {elem.description}
                    </p>
                  </div>
                );
              })
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}

export function SpecialSelectSchedule({ ...props }: SpecialSelectProps) {
  const [active, setActive] = useState(false);
  const [activeValue, setActiveValue] = useState({} as SearchValue);

  const searchbox: Variants = {
    active: { translateY: 0, opacity: 1, visibility: "visible" },
    disabled: { translateY: 10, opacity: 0, visibility: "hidden" },
  };

  const wrapperRef = useRef(null);

  function useOutsideAlerter(ref: React.MutableRefObject<any>) {
    useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        if (ref.current && !ref.current.contains(event.target)) {
          setActive(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  useOutsideAlerter(wrapperRef);

  const EmptyList = () => {
    return (
      <div className="w-full text-center h-full flex flex-col justify-center items-center gap-2 p-2">
        <p className="font-semibold text-lg text-slate-950 w-[50%]">
          Sin resultados
        </p>
        <p className="font-light text-sm text-slate-500 w-[70%]">
          Tal parece que no hay valores, lo sentimos
        </p>
      </div>
    );
  };

  const ValueOnList = ({
    props,
    customClick,
  }: {
    props: SearchValue;
    customClick: Function;
  }) => {
    return (
      <div
        onClick={() => {
          customClick(props);
        }}
        className={twMerge([
          "transition relative w-full h-fit cursor-pointer justify-center items-start bg-white hover:bg-slate-200 p-2",
        ])}
      >
        <div className="w-full overflow-hidden flex justify-start items-center gap-1">
          <span
            className={`w-8 h-8 relative block rounded-full bg-${props.color}`}
          ></span>
          <p className="block whitespace-nowrap font-medium text-gray-950 text-[0.9rem] w-[90%] overflow-hidden text-ellipsis">
            {props.title}
          </p>
        </div>
        <p className="block whitespace-nowrap font-light text-gray-500 text-[0.8rem] w-full max-w-[90%] overflow-hidden text-ellipsis">
          {props.description}
        </p>
      </div>
    );
  };

  useMemo(() => {
    if (props.selectedItem) setActiveValue(props.selectedItem);
  }, [props.selectedItem]);

  return (
    <div className={twMerge(["min-w-[4rem] w-full relative block"])}>
      <div
        onClick={() => {
          setActive(true);
        }}
        className={twMerge([
          "transition relative w-full h-fit cursor-pointer justify-center items-start bg-white border border-slate-300 rounded-md p-2",
        ])}
      >
        <div className="flex items-center justify-between">
          <div className="w-full">
            <div className="w-full overflow-hidden flex justify-start items-center gap-1">
              {activeValue.title && activeValue.id !== "ALL" && (
                <span
                  style={{ backgroundColor: activeValue.color }}
                  className={`w-[10px] h-[10px] relative block rounded-full`}
                ></span>
              )}
              <p className="block whitespace-nowrap font-medium text-gray-950 text-[0.9rem] max-w-[200px] overflow-hidden text-ellipsis">
                {activeValue.title
                  ? activeValue.title
                  : props.emptySelectedValue
                  ? props.emptySelectedValue["title"]
                  : "Nada aún"}
              </p>
            </div>
            <p className="block whitespace-nowrap font-light text-gray-500 text-[0.8rem] max-w-[200px] overflow-hidden text-ellipsis">
              {activeValue.description
                ? activeValue.description
                : props.emptySelectedValue
                ? props.emptySelectedValue["description"]
                : "Selecciona un valor de la lista"}
            </p>
          </div>

          <div>
            <i
              className={
                active ? "fa-solid fa-chevron-up" : "fa-solid fa-chevron-down"
              }
            />
          </div>
        </div>
      </div>
      <motion.div
        ref={wrapperRef}
        variants={searchbox}
        animate={active ? "active" : "disabled"}
        className={twMerge([
          "absolute top-full right-0 w-full block bg-white border rounded-md border-slate-100 shadow-md z-[20]",
        ])}
      >
        <div className="max-h-[30vh] w-full relative overflow-hidden h-fit overflow-y-auto">
          {props.list.length === 0 ? (
            <EmptyList />
          ) : (
            props.list.map((elem: SearchValue, i: number) => {
              return (
                <div
                  key={i}
                  onClick={() => {
                    setActiveValue(elem);
                    props.customClick(elem);
                    setActive(false);
                  }}
                  className={twMerge([
                    "transition relative w-full h-fit cursor-pointer justify-center items-start bg-white hover:bg-slate-200 p-2",
                  ])}
                >
                  <div className="w-full overflow-hidden flex justify-start items-center gap-1">
                    {elem.id !== "ALL" && (
                      <span
                        style={{ backgroundColor: elem.color }}
                        className={`w-[10px] h-[10px] relative block rounded-full`}
                      ></span>
                    )}
                    <p className="block whitespace-nowrap font-medium text-gray-950 text-[0.9rem] w-[98%] overflow-hidden text-ellipsis">
                      {elem.title}
                    </p>
                  </div>
                  <p className="block whitespace-nowrap font-light text-gray-500 text-[0.8rem] w-full max-w-[90%] overflow-hidden text-ellipsis">
                    {elem.description}
                  </p>
                </div>
              );
            })
          )}
        </div>
      </motion.div>
    </div>
  );
}
