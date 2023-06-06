import clsx from "clsx";
import { ICIE10 } from "domain/core/entities/cie10Entity";
import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import { FormInput } from "../Form";
import Lucide from "../Lucide";

interface IAutocompleteCInputCIE10Props {
  items: ICIE10[];
  defaultValue?: string;
  setDefaultValue?: boolean;
  itemsAdded?: ICIE10[];
  placeholder?: string;
  disabled?: boolean | undefined;
  className?: string;
  onClick?: (item: ICIE10) => void;
}

export default function AutocompleteInputCIE10({
  items,
  defaultValue = "",
  setDefaultValue = false,
  itemsAdded = [],
  placeholder = "",
  disabled,
  className = "",
  onClick = (item: ICIE10) => {},
}: IAutocompleteCInputCIE10Props) {
  const [field, setField] = useState("");
  const [itemsShow, setItemsShow] = useState<ICIE10[]>([]);

  const setItemsShowList = (valueItem: string) => {
    if (valueItem.length === 0 || items.length === 0) {
      setItemsShow([]);
      return;
    }

    const itemsToShowList: ICIE10[] = [];

    items.forEach((item: ICIE10) => {
      if (
        item.description4.toLowerCase().includes(valueItem.toLowerCase()) ||
        item.code4.toLowerCase().includes(valueItem.toLowerCase())
      ) {
        itemsToShowList.push(item);
      }
    });

    setItemsShow(itemsToShowList);
  };

  const handleAutocomplete = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setField(value);
    setItemsShowList(value);
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
          onFocus={() => setItemsShowList(field)}
        />
      </div>

      {itemsShow.length > 0 && (
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
