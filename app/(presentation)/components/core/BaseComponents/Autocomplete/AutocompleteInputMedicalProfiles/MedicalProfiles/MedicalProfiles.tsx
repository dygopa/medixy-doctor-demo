import clsx from "clsx";
import { IMedicalProfile } from "domain/core/entities/medicalProfileEntity";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { FormInput } from "../../../Form";
import Lucide from "../../../Lucide";
import {
  AutocompleteInputMedicalProfilesContext,
  IAutocompleteInputMedicalProfilesContext,
} from "../context/AutocompleteInputMedicalProfilesContext";

interface IMedicalProfileProps {
  defaultValue?: string;
  setDefaultValue?: boolean;
  itemsAdded?: IMedicalProfile[];
  placeholder?: string;
  disabled?: boolean | undefined;
  className?: string;
  onKeyDown?: (item: IMedicalProfile) => void;
  onClick?: (item: IMedicalProfile) => void;
  onChange?: (item: IMedicalProfile) => void | null;
}

export default function MedicalProfiles({
  defaultValue = "",
  setDefaultValue = false,
  itemsAdded = [],
  placeholder = "",
  disabled,
  className = "",
  onClick = (item: IMedicalProfile) => {},
  onKeyDown = (item: IMedicalProfile) => {},
  onChange,
}: IMedicalProfileProps) {
  const { state, actions, dispatch } =
    useContext<IAutocompleteInputMedicalProfilesContext>(
      AutocompleteInputMedicalProfilesContext
    );
  const { getMedicalProfiles } = actions;
  const {
    data: medicalProfiles,
    loading,
    error,
    successful,
  } = state.medicalProfiles;

  const [field, setField] = useState("");
  const [itemsShow, setItemsShow] = useState<IMedicalProfile[]>([]);

  const getMedicalProfilesDispatch = (value: string) =>
    getMedicalProfiles({ searchQuery: value.toLowerCase().trim() })(dispatch);

  const handleAutocomplete = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setField(value);

    if (onChange) onChange({ id: null, name: value });

    if (value.length > 0) {
      getMedicalProfilesDispatch(value);
      return;
    }

    setItemsShow([]);
  };

  const onClickItem = (item: IMedicalProfile) => {
    onClick(item);
    setItemsShow([]);

    if (!setDefaultValue) setField("");
  };

  const isAdded = (item: IMedicalProfile): boolean => {
    if (
      itemsAdded.length > 0 &&
      itemsAdded.findIndex((itemAdded) => itemAdded.id === item.id) >= 0
    )
      return true;

    return false;
  };

  useEffect(() => {
    if (successful && medicalProfiles.data.length > 0)
      setItemsShow(medicalProfiles.data);
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
              getMedicalProfilesDispatch(field);
              return;
            }

            setItemsShow([]);
          }}
        />
      </div>

      {itemsShow.length > 0 && !loading && !error && (
        <div className="absolute w-full bg-white shadow-md py-2 z-50 max-h-[140px] overflow-y-auto">
          {itemsShow.map((itemShow: IMedicalProfile) => (
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
