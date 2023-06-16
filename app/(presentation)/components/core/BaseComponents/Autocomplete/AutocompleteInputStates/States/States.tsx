import clsx from "clsx";
import { IFederalEntity } from "domain/core/entities/federalEntitiesEntity";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { FormInput } from "../../../Form";
import Lucide from "../../../Lucide";
import {
  AutocompleteInputStatesContext,
  IAutocompleteInputStatesContext,
} from "../context/AutocompleteInputStatesContext";

interface IStatesProps {
  defaultValue?: string;
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
  itemsAdded = [],
  placeholder = "",
  disabled,
  className = "",
  onChange = (item: string) => {},
  onClick = (item: IFederalEntity) => {},
}: IStatesProps) {
  const { state, actions, dispatch } =
    useContext<IAutocompleteInputStatesContext>(AutocompleteInputStatesContext);
  const { getFederalEntities } = actions;
  const {
    data: federalEntities,
    loading,
    error,
    successful,
  } = state.federalEntities;

  const [field, setField] = useState("");
  const [itemsShow, setItemsShow] = useState<IFederalEntity[]>([]);

  const getFederalEntitiesDispatch = (value: string) =>
    getFederalEntities({ searchQuery: value.toLowerCase().trim() })(dispatch);

  const handleAutocomplete = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setField(value);

    if (onChange) onChange(value);

    if (value.length > 0) {
      getFederalEntitiesDispatch(value);
      return;
    }

    setItemsShow([]);
  };

  const onClickItem = (item: IFederalEntity) => {
    onClick(item);
    setItemsShow([]);

    if (!setDefaultValue) setField("");
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

  useEffect(() => {
    if (successful && federalEntities.length > 0) setItemsShow(federalEntities);
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
              getFederalEntitiesDispatch(field);
              return;
            }

            setItemsShow([]);
          }}
        />
      </div>

      {itemsShow.length > 0 && !loading && !error && (
        <div className="absolute w-full bg-white shadow-md py-2 z-50 max-h-[140px] overflow-y-auto">
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
      )}
    </div>
  );
}
