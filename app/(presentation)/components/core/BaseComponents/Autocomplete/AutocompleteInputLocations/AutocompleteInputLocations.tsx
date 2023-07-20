import { ICountryLocation } from "domain/core/entities/countryEntity";
import AutocompleteInputLocationsProvider from "./context/AutocompleteInputLocationsContext";
import Locations from "./Locations/Locations";

interface IAutocompleteInputLocationsProps {
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

export default function AutocompleteInputLocations({
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
}: IAutocompleteInputLocationsProps) {
  return (
    <AutocompleteInputLocationsProvider>
      <Locations
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
        countryLocationId={countryLocationId}
      />
    </AutocompleteInputLocationsProvider>
  );
}
