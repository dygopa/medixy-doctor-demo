import { IMunicipality } from "domain/core/entities/municipalityEntity";
import AutocompleteInputMunProvider from "./context/AutocompleteInputMunContext";
import Municipalities from "./Municipalities/Municipalities";
import { IAutocompleteValue } from "../AutocompleteInput";

interface IAutocompleteInputMunicipalitiesProps {
  defaultValue?: string;
  setDefaultValue?: boolean;
  itemsAdded?: IAutocompleteValue[];
  placeholder?: string;
  disabled?: boolean | undefined;
  className?: string;
  onChange?: (item: string) => void;
  onClick?: (item: IAutocompleteValue) => void;
  municipalityId?: number | null;
  federalEntityId?: number | null;
}

export default function AutocompleteInputMunicipalities({
  defaultValue = "",
  setDefaultValue = false,
  itemsAdded = [],
  placeholder = "",
  disabled,
  className = "",
  onChange = (item: string) => {},
  onClick = (item: IAutocompleteValue) => {},
  municipalityId,
  federalEntityId,
}: IAutocompleteInputMunicipalitiesProps) {
  return (
    <AutocompleteInputMunProvider>
      <Municipalities
        disabled={disabled}
        defaultValue={defaultValue}
        setDefaultValue={setDefaultValue}
        itemsAdded={itemsAdded}
        placeholder={placeholder}
        className={className}
        onClick={onClick}
        onChange={onChange}
        federalEntityId={federalEntityId}
        municipalityId={municipalityId}
      />
    </AutocompleteInputMunProvider>
  );
}