import { useContext, useEffect } from "react";
import AutocompleteInput, { IAutocompleteValue } from "../AutocompleteInput";
import {
  AutocompleteInputLocationsContext,
  IAutocompleteInputLocationsContext,
} from "./context/AutocompleteInputLocationsContext";

interface IAutocompleteInputLocationsProps {
  query?: string | null;
  onClick: (item: IAutocompleteValue) => void;
  onChange: (value: string) => void;
  className?: string;
  disabled?: boolean;
  countryLocation?: string | null;
  federalEntityId?: number | null;
  municipalityCatalogId?: number | null;
}

export default function AutocompleteInputLocations({
  query,
  onClick,
  onChange,
  className,
  disabled = false,
  countryLocation,
  federalEntityId,
  municipalityCatalogId,
}: IAutocompleteInputLocationsProps) {
  const { state, actions, dispatch } =
    useContext<IAutocompleteInputLocationsContext>(
      AutocompleteInputLocationsContext
    );
  const { getCountryLocations } = actions;
  const { data: countryLocations, loading } = state.countryLocations;

  const getAutocompleteValues = (): IAutocompleteValue[] => {
    const values: IAutocompleteValue[] = [];

    if (countryLocations.data && countryLocations.data.length > 0) {
      countryLocations.data.forEach((countryLocation) => {
        const value: IAutocompleteValue = {
          id: countryLocation.id,
          name: countryLocation.name,
        };

        values.push(value);
      });
    }

    return values;
  };

  const getLocationsDispatch = (value?: string | null) => {
    getCountryLocations({
      searchQuery: value ? value.toLowerCase().trim() : null,
      federalEntityId: federalEntityId,
      municipalityId: municipalityCatalogId,
    })(dispatch);
  };

  useEffect(() => {
    getLocationsDispatch(query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, federalEntityId, municipalityCatalogId]);

  return (
    <AutocompleteInput
      showCreateItem={false}
      disabled={disabled}
      items={getAutocompleteValues()}
      defaultValue={countryLocation}
      onClick={onClick}
      onClear={() =>
        onClick({
          id: 0,
          name: "",
        } as IAutocompleteValue)
      }
      onChange={(value: string) => {
        getLocationsDispatch(value);
        onChange(value);
      }}
      className={className}
      activeSearch={false}
      onlyItemsAdd
    />
  );
}
