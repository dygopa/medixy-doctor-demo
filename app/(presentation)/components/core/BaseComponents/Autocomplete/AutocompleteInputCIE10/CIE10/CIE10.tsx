import clsx from "clsx";
import { ICIE10 } from "domain/core/entities/cie10Entity";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { FormInput } from "../../../Form";
import Lucide from "../../../Lucide";
import {
  AutocompleteInputCIE10Context,
  IAutocompleteInputCIE10Context,
} from "../context/AutocompleteInputCIE10Context";

interface ICIE10Props {
  defaultValue?: string;
  setDefaultValue?: boolean;
  itemsAdded?: ICIE10[];
  placeholder?: string;
  disabled?: boolean | undefined;
  className?: string;
  onClick?: (item: ICIE10) => void;
}

export default function CIE10({
  defaultValue = "",
  setDefaultValue = false,
  itemsAdded = [],
  placeholder = "",
  disabled,
  className = "",
  onClick = (item: ICIE10) => {},
}: ICIE10Props) {
  const { state, actions, dispatch } =
    useContext<IAutocompleteInputCIE10Context>(AutocompleteInputCIE10Context);
  const { getCIE10 } = actions;
  const { data: cie10, loading, error, successful } = state.cie10;

  const [field, setField] = useState("");
  const [itemsShow, setItemsShow] = useState<ICIE10[]>([]);

  const getCIE10Dispatch = (value: string) =>
    getCIE10({ searchQuery: value.toLowerCase().trim() })(dispatch);

  const handleAutocomplete = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setField(value);

    if (value.length > 0) {
      getCIE10Dispatch(value);
      return;
    }

    setItemsShow([]);
  };

  const onClickItem = (item: ICIE10) => {
    onClick(item);
    setItemsShow([]);

    if (!setDefaultValue) setField("");
  };

  const isAdded = (item: ICIE10): boolean => {
    if (
      itemsAdded.length > 0 &&
      itemsAdded.findIndex((itemAdded) => itemAdded.id === item.id) >= 0
    )
      return true;

    return false;
  };

  useEffect(() => {
    if (successful && cie10.data.length > 0) setItemsShow(cie10.data);
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
            if (field.length > 0) {
              getCIE10Dispatch(field);
              return;
            }

            setItemsShow([]);
          }}
        />
      </div>

      {itemsShow.length > 0 && !loading && !error && (
        <div className="absolute w-full bg-white shadow-md py-2 z-50 max-h-[140px] overflow-y-auto">
          {itemsShow.map((itemShow: ICIE10) => (
            <button
              type="button"
              key={itemShow.id}
              className="py-2 hover:bg-gray-500 hover:bg-opacity-10 w-full text-left"
              onClick={() => onClickItem(itemShow)}
            >
              <div className="flex justify-between px-2">
                <div>
                  <p className="text-slate-900 text-md">
                    {itemShow.code4} - {itemShow.description4}
                  </p>
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
