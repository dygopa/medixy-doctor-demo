import clsx from "clsx";
import { IFederalEntity } from "domain/core/entities/federalEntitiesEntity";
import { IMunicipality } from "domain/core/entities/municipalityEntity";
import { ChangeEvent, useContext, useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import Button from "../../../Button";
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
  municipalityId?: number | null;
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
  municipalityId,
  federalEntityId,
}: IMunicipalitiesProps) {
  const { state, actions, dispatch } = useContext<IAutocompleteInputMunContext>(
    AutocompleteInputMunContext
  );
  const { getMunicipalities, getMunicipalityById } = actions;
  const {
    data: municipalities,
    loading,
    error,
    successful,
  } = state.municipalities;
  const { data: municipality } = state.municipality;

  const wrapperRef = useRef(null);

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
    if (successful && municipalities.data.length > 0)
      setItemsShow(municipalities.data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successful]);

  useEffect(() => {
    setField("");
  }, [federalEntityId]);

  useEffect(() => {
    setField(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    if (municipalityId) getMunicipalityById({ id: municipalityId })(dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [municipalityId]);

  useEffect(() => {
    if (municipality.data?.id) setField(municipality.data.name);
  }, [municipality]);

  return (
    <div className="w-full relative">
      <div className="w-full">
        <FormInput
          value={field}
          autoComplete="off"
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
        />
      </div>
      {field.length > 0 && (
        <div className="absolute top-2 right-3">
          <Button
            onClick={() => {
              setField("");
              getMunicipalitiesDispatch();
              setItemsShow([]);
              onClickItem({
                id: 0,
                catalogId: 0,
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
        {itemsShow.map((itemShow: IMunicipality) => (
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
