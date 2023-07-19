import clsx from "clsx";
import { ICountryLocation } from "domain/core/entities/countryEntity";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { FormInput } from "../../../Form";
import Lucide from "../../../Lucide";
import {
  AutocompleteInputLocationsContext,
  IAutocompleteInputLocationsContext,
} from "../context/AutocompleteInputLocationsContext";

interface ILocationsProps {
  defaultValue?: string;
  setDefaultValue?: boolean;
  itemsAdded?: ICountryLocation[];
  placeholder?: string;
  disabled?: boolean | undefined;
  className?: string;
  onChange?: (item: string) => void;
  onClick?: (item: ICountryLocation) => void;
  federalEntityId?: number | null;
  municipalityId?: number | null;
}

export default function Locations({
  defaultValue = "",
  setDefaultValue = false,
  itemsAdded = [],
  placeholder = "",
  disabled,
  className = "",
  onChange = (item: string) => {},
  onClick = (item: ICountryLocation) => {},
  federalEntityId,
  municipalityId,
}: ILocationsProps) {
  const { state, actions, dispatch } =
    useContext<IAutocompleteInputLocationsContext>(
      AutocompleteInputLocationsContext
    );
  const { getCountryLocations } = actions;
  const {
    data: countryLocations,
    loading,
    error,
    successful,
  } = state.countryLocations;

  const [field, setField] = useState("");
  const [itemsShow, setItemsShow] = useState<ICountryLocation[]>([]);
  const [focus, setFocus] = useState(false);

  const getCountryLocationsDispatch = (value?: string | null) =>
    getCountryLocations({
      searchQuery: value ? value.toLowerCase().trim() : "",
      federalEntityId: federalEntityId,
      municipalityId: municipalityId,
    })(dispatch);

  const handleAutocomplete = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setField(value);

    if (onChange) onChange(value);

    if (value.length > 0) {
      getCountryLocationsDispatch(value);
      return;
    }

    getCountryLocationsDispatch();
  };

  const onClickItem = (item: ICountryLocation) => {
    onClick(item);
    setItemsShow([]);
    setField(item.name);
  };

  const isAdded = (item: ICountryLocation): boolean => {
    if (
      itemsAdded.length > 0 &&
      itemsAdded.findIndex((itemAdded) => itemAdded.id === item.id) >= 0
    )
      return true;

    return false;
  };

  useEffect(() => {
    if (successful && countryLocations.data.length > 0)
      setItemsShow(countryLocations.data);
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

            if (field.length === 0) getCountryLocationsDispatch();

            setItemsShow([]);
          }}
          onBlur={() => {
            setTimeout(() => {
              setFocus(false);
            }, 100);
          }}
        />
      </div>

      {itemsShow.length > 0 && !loading && !error && focus && (
        <div className="absolute w-full bg-white shadow-md py-2 z-50 max-h-[140px] overflow-y-auto">
          {itemsShow.map((itemShow: ICountryLocation) => (
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
