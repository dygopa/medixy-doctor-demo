import clsx from "clsx";
import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import { FormInput } from "../Form";
import Lucide from "../Lucide";

interface IAutocompleteInputProps {
  items: string[];
  defaultValue?: string;
  setDefaultValue?: boolean;
  itemsAdded?: string[];
  placeholder?: string;
  disabled?: boolean | undefined;
  className?: string;
  onKeyDown?: (item: string) => void;
  onClick?: (item: string) => void;
  onChange?: (item: string) => void | null;
  onlyItemsAdd?: boolean;
}

export default function AutocompleteInput({
  items,
  defaultValue = "",
  setDefaultValue = false,
  itemsAdded = [],
  placeholder = "",
  disabled,
  className = "",
  onClick = (item: string) => {},
  onKeyDown = (item: string) => {},
  onChange,
  onlyItemsAdd = false,
}: IAutocompleteInputProps) {
  const [field, setField] = useState("");
  const [itemsShow, setItemsShow] = useState<string[]>([]);

  const setItemsShowList = (valueItem: string) => {
    if (valueItem.length === 0 || items.length === 0) {
      setItemsShow([]);
      return;
    }

    const itemsToShowList: string[] = [];

    items.forEach((item: string) => {
      if (item.toLowerCase().includes(valueItem.toLowerCase())) {
        itemsToShowList.push(item);
      }
    });

    setItemsShow(itemsToShowList);
  };

  const onClickItem = (item: string) => {
    onClick(item);
    setItemsShow([]);

    if (!setDefaultValue) setField("");
  };

  const onKeyDownEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (
      e.key === "Enter" &&
      onlyItemsAdd &&
      field.length > 0 &&
      items.indexOf(field) >= 0
    ) {
      onKeyDown(field);
      setItemsShow([]);

      if (!setDefaultValue) setField("");
      return;
    }

    if (e.key === "Enter" && field.length > 0 && !onlyItemsAdd) {
      onKeyDown(field);
      setItemsShow([]);

      if (!setDefaultValue) setField("");
    }
  };

  const isAdded = (item: string): boolean => {
    if (itemsAdded.length > 0 && itemsAdded.indexOf(item) >= 0) return true;

    return false;
  };

  const handleAutocomplete = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setField(value);
    setItemsShowList(value);

    if (onChange) onChange(value);
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
          onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => onKeyDownEnter(e)}
          onFocus={() => setItemsShowList(field)}
        />
      </div>

      {itemsShow.length > 0 && (
        <div className="absolute w-full bg-white shadow-md py-2 z-50 max-h-[140px] overflow-y-auto">
          {itemsShow.map((itemShow: string, i: number) => (
            <button
              type="button"
              key={i}
              className="py-2 hover:bg-gray-500 hover:bg-opacity-10 w-full text-left"
              onClick={() => onClickItem(itemShow)}
            >
              <div className="flex justify-between px-2">
                <div>
                  <p className="text-slate-900 text-md">{itemShow}</p>
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
