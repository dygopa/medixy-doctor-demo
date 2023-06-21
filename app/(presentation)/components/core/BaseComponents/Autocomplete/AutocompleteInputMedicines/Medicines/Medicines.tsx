import clsx from "clsx";
import { IMedicine } from "domain/core/entities/medicineEntity";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { FormInput } from "../../../Form";
import Lucide from "../../../Lucide";
import {
  AutocompleteInputMedicinesContext,
  IAutocompleteInputMedicinesContext,
} from "../context/AutocompleteInputMedicinesContext";

interface IMedicinesProps {
  defaultValue?: string;
  setDefaultValue?: boolean;
  itemsAdded?: IMedicine[];
  placeholder?: string;
  disabled?: boolean | undefined;
  className?: string;
  onChange?: (item: string) => void;
  onClick?: (item: IMedicine) => void;
}

export default function Medicines({
  defaultValue = "",
  setDefaultValue = false,
  itemsAdded = [],
  placeholder = "",
  disabled,
  className = "",
  onChange = (item: string) => {},
  onClick = (item: IMedicine) => {},
}: IMedicinesProps) {
  const { state, actions, dispatch } =
    useContext<IAutocompleteInputMedicinesContext>(
      AutocompleteInputMedicinesContext
    );
  const { getMedicines } = actions;
  const { data: medicines, loading, error, successful } = state.medicines;

  const [field, setField] = useState("");
  const [itemsShow, setItemsShow] = useState<IMedicine[]>([]);

  const getMedicinesDispatch = (value: string) =>
    getMedicines({
      searchQuery: value.toLowerCase().trim(),
    })(dispatch);

  const handleAutocomplete = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setField(value);

    if (onChange) onChange(value);

    if (value.length > 0) {
      getMedicinesDispatch(value);
      return;
    }

    setItemsShow([]);
  };

  const onClickItem = (item: IMedicine) => {
    onClick(item);
    setItemsShow([]);

    if (!setDefaultValue) setField("");
  };

  const isAdded = (item: IMedicine): boolean => {
    if (
      itemsAdded.length > 0 &&
      itemsAdded.findIndex((itemAdded) => itemAdded.id === item.id) >= 0
    )
      return true;

    return false;
  };

  useEffect(() => {
    if (successful && medicines.data.length > 0) setItemsShow(medicines.data);
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
              getMedicinesDispatch(field);
              return;
            }

            setItemsShow([]);
          }}
        />
      </div>

      {itemsShow.length > 0 && !loading && !error && (
        <div className="absolute w-full bg-white shadow-md py-2 z-50 max-h-[140px] overflow-y-auto">
          {itemsShow.map((itemShow: IMedicine) => (
            <button
              type="button"
              key={itemShow.id}
              className="py-2 hover:bg-gray-500 hover:bg-opacity-10 w-full text-left"
              onClick={() => onClickItem(itemShow)}
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
