import { useContext, useEffect } from "react";
import AutocompleteInput, { IAutocompleteValue } from "../AutocompleteInput";
import {
  AutocompleteInputLocationsContext,
  IAutocompleteInputLocationsContext,
} from "./context/AutocompleteInputLocationsContext";

interface IAutocompleteInputLocationsProps {
  query?: string | null;
  onClick: (item: IAutocompleteValue) => void;
  className?: string;
  disabled?: boolean;
  countryLocationId?: number | null;
  federalEntityId?: number | null;
  municipalityCatalogId?: number | null;
}

export default function AutocompleteInputLocations({
  query,
  onClick,
  className,
  disabled = false,
  countryLocationId,
  federalEntityId,
  municipalityCatalogId,
}: IAutocompleteInputLocationsProps) {
  const { state, actions, dispatch } =
    useContext<IAutocompleteInputLocationsContext>(
      AutocompleteInputLocationsContext
    );
  const { getCountryLocations, getCountryLocationById } = actions;
  const { data: countryLocations, loading } = state.countryLocations;
  const { data: countryLocation } = state.countryLocation;

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

  useEffect(() => {
    if (countryLocationId && countryLocationId !== 0)
      getCountryLocationById({ id: countryLocationId })(dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countryLocationId]);

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
      defaultValue={
        countryLocation.data && countryLocation.data.name
          ? countryLocation.data.name
          : null
      }
      onClick={onClick}
      onClear={() =>
        onClick({
          id: 0,
          name: "",
        } as IAutocompleteValue)
      }
      onChange={(value: string) => getLocationsDispatch(value)}
      className={className}
      activeSearch={false}
      onlyItemsAdd
    />
  );
}
