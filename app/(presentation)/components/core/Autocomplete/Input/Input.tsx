import clsx from "clsx";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { FormInput } from "../../BaseComponents/Form";
import Lucide from "../../BaseComponents/Lucide";
import Button from "../../BaseComponents/Button";
import {
  AutocompleteContext,
  IAutocompleteContext,
} from "../context/AutocompleteContext";
import { IAutocompleteData } from "../context/AutocompleteActions";

interface IInputProp {
  defaultValue?: string;
  valueId?: number | null;
  setDefaultValue?: boolean;
  itemsAdded?: IAutocompleteData[];
  typeAutocomplete: "SPECIALTIES" | "SERVICES_CATEGORIES";
  placeholder?: string;
  disabled?: boolean | undefined;
  className?: string;
  doctorId: number;
  onChange?: (item: string) => void;
  onClick?: (item: IAutocompleteData) => void;
}

export default function Input({
  defaultValue = "",
  setDefaultValue = false,
  valueId,
  itemsAdded = [],
  typeAutocomplete = "SPECIALTIES",
  placeholder = "",
  disabled,
  className = "",
  doctorId,
  onChange = (item: string) => {},
  onClick = (item: IAutocompleteData) => {},
}: IInputProp) {
  const { state, actions, dispatch } =
    useContext<IAutocompleteContext>(AutocompleteContext);
  const { getData } = actions;
  const { data: listData, loading, error, successful } = state.data;

  const [field, setField] = useState("");
  const [itemsShow, setItemsShow] = useState<IAutocompleteData[]>([]);
  const [focus, setFocus] = useState(false);

  const getDataDispatch = (value?: string | null) =>
    getData({
      type: typeAutocomplete,
      doctorId: doctorId,
      searchQuery: value,
    })(dispatch);

  const handleAutocomplete = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setField(value);

    if (onChange) onChange(value);

    if (value.length > 0) {
      getDataDispatch(value);
      return;
    }

    getDataDispatch();
  };

  const onClickItem = (item: IAutocompleteData) => {
    onClick(item);
    setItemsShow([]);
    setField(item.name);
  };

  const isAdded = (item: IAutocompleteData): boolean => {
    if (
      itemsAdded.length > 0 &&
      itemsAdded.findIndex((itemAdded) => itemAdded.id === item.id) >= 0
    )
      return true;

    return false;
  };

  useEffect(() => {
    if (successful && listData.length > 0) setItemsShow(listData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successful]);

  useEffect(() => {
    setField(defaultValue);
  }, [defaultValue]);

  return (
    <div className="w-full relative">
      <div className="w-full">
        <FormInput
          value={field}
          type="text"
          disabled={disabled}
          placeholder={placeholder}
          name="autocompleteField"
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleAutocomplete(e)}
          className={clsx([className])}
          onFocus={() => {
            setFocus(true);

            if (listData.length === 0)
              getDataDispatch(field.length > 0 ? field : null);
          }}
          onBlur={() => {
            setTimeout(() => {
              setFocus(false);
            }, 100);
          }}
        />
      </div>

      {field.length > 0 && (
        <div className="absolute top-2 right-3">
          <Button
            onClick={() => {
              setField("");
              getDataDispatch(null);
              setItemsShow([]);
              onClickItem({
                id: 0,
                name: "",
                doctorId: null,
              });
            }}
            className="p-0 border-none hover:bg-gray-400 radius-lg"
          >
            <Lucide icon="X" className="" size={20} />
          </Button>
        </div>
      )}
      {itemsShow.length > 0 && !loading && !error && focus && (
        <div className="absolute w-full bg-white shadow-md py-2 z-50 max-h-[140px] overflow-y-auto">
          {itemsShow.map((itemShow: IAutocompleteData) => (
            <button
              type="button"
              key={itemShow.id}
              className="py-2 hover:bg-gray-500 hover:bg-opacity-10 w-full text-left"
              onClick={() => {
                onClickItem(itemShow);
                setFocus(false);
              }}
            >
              <div className="flex justify-between px-2">
                <div>
                  <p className="text-slate-900 text-md">{itemShow.name}</p>
                </div>

                {isAdded(itemShow) && (
                  <div>
                    <Lucide icon="Check" color="#22345F" size={20} />
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
