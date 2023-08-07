import clsx from "clsx";
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import Button from "../Button";
import { FormInput } from "../Form";
import Lucide from "../Lucide";

export interface IAutocompleteValue {
  id: number;
  additionalId?: number | null;
  name: string;
}

interface IAutocompleteInputProps {
  items: IAutocompleteValue[];
  itemsListAdded?: string[];
  placeholder?: string;
  disabled?: boolean | undefined;
  className?: string;
  onKeyDown?: (item: IAutocompleteValue) => void;
  onClick?: (item: IAutocompleteValue) => void | null;
  onClear?: () => void;
  onChange?: (item: string) => void | null;
  onlyItemsAdd?: boolean;
  showClearButton?: boolean;
  activeSearch?: boolean;
}

export default function AutocompleteInput({
  items,
  itemsListAdded = [],
  placeholder = "",
  disabled,
  className = "",
  onClick = (item: IAutocompleteValue) => {},
  onKeyDown = (item: IAutocompleteValue) => {},
  onClear,
  onChange,
  onlyItemsAdd = false,
  showClearButton = true,
  activeSearch = true,
}: IAutocompleteInputProps) {
  const [field, setField] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [itemsList, setItemsList] = useState<IAutocompleteValue[]>([]);
  const [itemsAdded, setItemsAdded] = useState<string[]>([]);

  const wrapperRef = useRef(null);

  const onClickItem = (item: IAutocompleteValue) => {
    onClick(item);
    setField("");
    setShowDropdown(false);
    setItemsAdded([...itemsAdded, item.name]);
  };

  const onKeyDownEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    const item = items.findIndex((itemFind) => itemFind.name === field);

    if (e.key === "Enter" && onlyItemsAdd && field.length > 0 && item >= 0) {
      onKeyDown({
        id: 0,
        name: field,
      } as IAutocompleteValue);
      setItemsAdded([...itemsAdded, field]);
      setField("");

      return;
    }

    if (e.key === "Enter" && field.length > 0 && !onlyItemsAdd) {
      onKeyDown({
        id: 0,
        name: field,
      } as IAutocompleteValue);

      setItemsAdded([...itemsAdded, field]);
      setField("");
    }
  };

  const isAdded = (item: string): boolean => {
    if (itemsAdded.length > 0 && itemsAdded.indexOf(item) >= 0) return true;

    return false;
  };

  const setItemsShowList = (query: string) => {
    if (query.length === 0 || items.length === 0) {
      setItemsList([]);
      return;
    }

    const itemsToShowList: IAutocompleteValue[] = [];

    items.forEach((item: IAutocompleteValue) => {
      if (item.name.toLowerCase().includes(query.toLowerCase())) {
        itemsToShowList.push(item);
      }
    });

    setItemsList(itemsToShowList);
  };

  const handleAutocomplete = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setField(value);

    if (activeSearch) setItemsShowList(value);

    if (onChange) onChange(value);
  };

  /* useEffect(() => {
    setField(defaultValue);
  }, [defaultValue]); */

  useEffect(() => {
    if (items.length > 0) setItemsList(items);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  useEffect(() => {
    if (itemsListAdded.length > 0) setItemsAdded(itemsListAdded);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemsListAdded]);

  function useOutsideAlerter(ref: React.MutableRefObject<any>) {
    useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        if (ref.current && !ref.current.contains(event.target)) {
          setShowDropdown(false);
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
    <div className="w-full relative" ref={wrapperRef}>
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
          onFocus={() => setShowDropdown(true)}
        />
      </div>

      {field.length > 0 && showClearButton && (
        <div className="absolute top-2 right-3">
          <Button
            onClick={() => {
              setField("");

              setShowDropdown(false);

              if (onClear) onClear();
            }}
            className="p-0 border-none hover:bg-gray-400 radius-lg"
          >
            <Lucide icon="X" className="" size={20} />
          </Button>
        </div>
      )}

      <div
        className={twMerge([
          "absolute w-full bg-white shadow-md py-2 z-50 max-h-[140px] overflow-y-auto",
          showDropdown && itemsList.length > 0 ? "visible" : "invisible",
        ])}
      >
        {itemsList.map((itemShow: IAutocompleteValue) => (
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

              {isAdded(itemShow.name) && (
                <div>
                  <Lucide icon="Check" color="#22345F" size={20} />
                </div>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
