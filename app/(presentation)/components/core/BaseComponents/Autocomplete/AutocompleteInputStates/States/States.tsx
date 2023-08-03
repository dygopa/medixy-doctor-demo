import clsx from "clsx";
import { IFederalEntity } from "domain/core/entities/federalEntitiesEntity";
import { ChangeEvent, useContext, useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import Button from "../../../Button";
import { FormInput } from "../../../Form";
import Lucide from "../../../Lucide";
import {
  AutocompleteInputStatesContext,
  IAutocompleteInputStatesContext,
} from "../context/AutocompleteInputStatesContext";

interface IStatesProps {
  defaultValue?: string;
  federalEntityId?: number | null;
  setDefaultValue?: boolean;
  itemsAdded?: IFederalEntity[];
  placeholder?: string;
  disabled?: boolean | undefined;
  className?: string;
  onChange?: (item: string) => void;
  onClick?: (item: IFederalEntity) => void;
}

export default function States({
  defaultValue = "",
  setDefaultValue = false,
  federalEntityId,
  itemsAdded = [],
  placeholder = "",
  disabled,
  className = "",
  onChange = (item: string) => {},
  onClick = (item: IFederalEntity) => {},
}: IStatesProps) {
  const { state, actions, dispatch } =
    useContext<IAutocompleteInputStatesContext>(AutocompleteInputStatesContext);
  const { getFederalEntities, getFederalEntityById } = actions;
  const {
    data: federalEntities,
    loading,
    error,
    successful,
  } = state.federalEntities;
  const { data: federalEntity } = state.federalEntity;

  const [field, setField] = useState("");
  const [itemsShow, setItemsShow] = useState<IFederalEntity[]>([]);
  const [focus, setFocus] = useState(false);

  const wrapperRef = useRef(null);

  const getFederalEntitiesDispatch = (value?: string | null) =>
    getFederalEntities({
      searchQuery: value ? value.toLowerCase().trim() : null,
    })(dispatch);

  const handleAutocomplete = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setField(value);

    if (onChange) onChange(value);

    if (value.length > 0) {
      getFederalEntitiesDispatch(value);
      return;
    }

    getFederalEntitiesDispatch();
  };

  const onClickItem = (item: IFederalEntity) => {
    onClick(item);
    setField(item.nameEntity);
    setItemsShow([]);
  };

  const isAdded = (item: IFederalEntity): boolean => {
    if (
      itemsAdded.length > 0 &&
      itemsAdded.findIndex(
        (itemAdded) => itemAdded.entityId === item.entityId
      ) >= 0
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
    if (federalEntityId)
      getFederalEntityById({ id: federalEntityId })(dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [federalEntityId]);

  useEffect(() => {
    if (federalEntity.entityId) setField(federalEntity.nameEntity);
  }, [federalEntity]);

  useEffect(() => {
    if (successful && federalEntities.length > 0) setItemsShow(federalEntities);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successful]);

  useEffect(() => {
    setField(defaultValue);
  }, [defaultValue]);

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
          onFocus={() => {
            setFocus(true);

            if (federalEntities.length === 0)
              getFederalEntitiesDispatch(field.length > 0 ? field : null);
          }}
        />
      </div>
      {field.length > 0 && (
        <div className="absolute top-2 right-3">
          <Button
            onClick={() => {
              setField("");
              getFederalEntitiesDispatch(null);
              setItemsShow([]);
              onClickItem({
                entityId: 0,
                nameEntity: "",
                abbrevation: "",
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
        {itemsShow.map((itemShow: IFederalEntity) => (
          <button
            type="button"
            key={itemShow.entityId}
            className="py-2 hover:bg-gray-500 hover:bg-opacity-10 w-full text-left"
            onClick={() => onClickItem(itemShow)}
          >
            <div className="flex justify-between px-2">
              <div>
                <p className="text-slate-900 text-md">
                  {itemShow.abbrevation} - {itemShow.nameEntity}
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
    </div>
  );
}
