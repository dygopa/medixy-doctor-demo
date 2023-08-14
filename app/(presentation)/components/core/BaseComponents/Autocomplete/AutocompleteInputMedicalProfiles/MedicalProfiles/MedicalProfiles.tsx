import { useContext, useEffect } from "react";
import AutocompleteInput, { IAutocompleteValue } from "../../AutocompleteInput";
import {
  AutocompleteInputMedicalProfilesContext,
  IAutocompleteInputMedicalProfilesContext,
} from "../context/AutocompleteInputMedicalProfilesContext";

interface IMedicalProfilesProps {
  onClick: (item: IAutocompleteValue) => void;
  onChange?: (item: string) => void;
  placeholder?: string | undefined;
  defaultValue?: string | null;
  className?: string;
}

export default function MedicalProfiles({
  onClick,
  onChange,
  placeholder,
  defaultValue,
  className,
}: IMedicalProfilesProps) {
  const { state, actions, dispatch } =
    useContext<IAutocompleteInputMedicalProfilesContext>(
      AutocompleteInputMedicalProfilesContext
    );
  const { getMedicalProfiles } = actions;
  const { data: medicalProfiles, loading } = state.medicalProfiles;

  const getAutocompleteValues = (): IAutocompleteValue[] => {
    const values: IAutocompleteValue[] = [];

    if (medicalProfiles.data && medicalProfiles.data.length > 0) {
      medicalProfiles.data.forEach((medicalProfile) => {
        const value: IAutocompleteValue = {
          id: medicalProfile.id ?? 0,
          name: medicalProfile.name,
        };

        values.push(value);
      });
    }

    return values;
  };

  const getMedicalProfilesDispatch = (value: string) => {
    getMedicalProfiles({
      searchQuery: value.toLowerCase().trim(),
    })(dispatch);
  };

  useEffect(() => {
    getMedicalProfilesDispatch("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AutocompleteInput
      showCreateItem={true}
      items={getAutocompleteValues()}
      placeholder={placeholder}
      defaultValue={defaultValue}
      onClick={onClick}
      onClear={() =>
        onClick({
          id: 0,
          name: "",
        } as IAutocompleteValue)
      }
      onChange={(value: string) => {
        getMedicalProfilesDispatch(value);

        if (onChange) onChange(value);
      }}
      className={className}
      activeSearch={false}
      showClearButton={false}
    />
  );
}
