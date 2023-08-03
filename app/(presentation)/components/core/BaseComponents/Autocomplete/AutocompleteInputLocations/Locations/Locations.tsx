import clsx from "clsx";
import { ICountryLocation } from "domain/core/entities/countryEntity";
import { IFederalEntity } from "domain/core/entities/federalEntitiesEntity";
import { ChangeEvent, useContext, useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import Button from "../../../Button";
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
  countryLocationId?: number | null;
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
  countryLocationId,
}: ILocationsProps) {
  const { state, actions, dispatch } =
    useContext<IAutocompleteInputLocationsContext>(
      AutocompleteInputLocationsContext
    );
  const { getCountryLocations, getCountryLocationById, getMunicipalityById } =
    actions;
  const { data: municipality } = state.municipality;
  const {
    data: countryLocations,
    loading,
    error,
    successful,
  } = state.countryLocations;
  const { data: countryLocation } = state.countryLocation;

  const wrapperRef = useRef(null);

  const [field, setField] = useState("");
  const [itemsShow, setItemsShow] = useState<ICountryLocation[]>([]);
  const [focus, setFocus] = useState(false);

  useEffect(() => {
    if (municipalityId) getMunicipalityById({ id: municipalityId })(dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [municipalityId]);

  const getCountryLocationsDispatch = (value?: string | null) =>
    getCountryLocations({
      searchQuery: value ? value.toLowerCase().trim() : "",
      federalEntityId: federalEntityId,
      municipalityId: municipality.data?.catalogId,
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

  function useOutsideAlerter(ref: React.MutableRefObject<any>) {
    useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        if (ref.current && !ref.current.contains(event.target)) {
          setFocus(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  useOutsideAlerter(wrapperRef);

  useEffect(() => {
    if (successful && countryLocations.data.length > 0)
      setItemsShow(countryLocations.data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successful]);

  useEffect(() => {
    setField(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    setField("");
  }, [federalEntityId, municipalityId]);

  useEffect(() => {
    if (countryLocationId)
      getCountryLocationById({ id: countryLocationId })(dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countryLocationId]);

  useEffect(() => {
    if (countryLocation.data?.id) setField(countryLocation.data.name);
  }, [countryLocation]);

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

      {field.length > 0 && (
        <div className="absolute top-2 right-3">
          <Button
            onClick={() => {
              getCountryLocationsDispatch();
              setItemsShow([]);
              onClickItem({
                id: 0,
                municipalityId: municipality.data?.catalogId ?? 0,
                name: "",
                federalEntityId: federalEntityId ?? 0,
                federalEntity: {} as IFederalEntity,
              });
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
          itemsShow.length > 0 && !loading && !error && focus
            ? "visible"
            : "invisible",
        ])}
      >
        {itemsShow.map((itemShow: ICountryLocation) => (
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
    </div>
  );
}
