import clsx from "clsx";
import { IMunicipality } from "domain/core/entities/municipalityEntity";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { FormInput } from "../../../Form";
import Lucide from "../../../Lucide";
import {
  AutocompleteInputMunContext,
  IAutocompleteInputMunContext,
} from "../context/AutocompleteInputMunContext";

interface IMunicipalitiesProps {
  defaultValue?: string;
  setDefaultValue?: boolean;
  itemsAdded?: IMunicipality[];
  placeholder?: string;
  disabled?: boolean | undefined;
  className?: string;
  onChange?: (item: string) => void;
  onClick?: (item: IMunicipality) => void;
  federalEntityId?: number | null;
}

export default function Municipalities({
  defaultValue = "",
  setDefaultValue = false,
  itemsAdded = [],
  placeholder = "",
  disabled,
  className = "",
  onChange = (item: string) => {},
  onClick = (item: IMunicipality) => {},
  federalEntityId,
}: IMunicipalitiesProps) {
  const { state, actions, dispatch } = useContext<IAutocompleteInputMunContext>(
    AutocompleteInputMunContext
  );
  const { getMunicipalities } = actions;
  const {
    data: municipalities,
    loading,
    error,
    successful,
  } = state.municipalities;

  const [field, setField] = useState("");
  const [itemsShow, setItemsShow] = useState<IMunicipality[]>([]);
  const [focus, setFocus] = useState(false);

  const getMunicipalitiesDispatch = (value?: string | null) =>
    getMunicipalities({
      searchQuery: value ? value.toLowerCase().trim() : null,
      federalEntityId: federalEntityId,
    })(dispatch);

  const handleAutocomplete = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setField(value);

    if (onChange) onChange(value);

    if (value.length > 0) {
      getMunicipalitiesDispatch(value);
      return;
    }

    getMunicipalitiesDispatch();
  };

  const onClickItem = (item: IMunicipality) => {
    onClick(item);
    setItemsShow([]);
    setField(item.name);
  };

  const isAdded = (item: IMunicipality): boolean => {
    if (
      itemsAdded.length > 0 &&
      itemsAdded.findIndex((itemAdded) => itemAdded.id === item.id) >= 0
    )
      return true;

    return false;
  };

  useEffect(() => {
    if (successful && municipalities.data.length > 0)
      setItemsShow(municipalities.data);
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

            if (field.length === 0) getMunicipalitiesDispatch();
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
          {itemsShow.map((itemShow: IMunicipality) => (
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
