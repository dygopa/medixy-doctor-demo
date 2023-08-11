import { useContext, useEffect } from "react";
import AutocompleteInput, { IAutocompleteValue } from "../AutocompleteInput";
import {
  AutocompleteInputMunContext,
  IAutocompleteInputMunContext,
} from "./context/AutocompleteInputMunContext";

interface IAutocompleteInputMunicipalitiesProps {
  query?: string | null;
  onClick: (item: IAutocompleteValue) => void;
  className?: string;
  disabled?: boolean;
  municipalityId?: number | null;
  federalEntityId?: number | null;
}

export default function AutocompleteInputMunicipalities({
  query,
  onClick,
  className,
  disabled = false,
  municipalityId,
  federalEntityId,
}: IAutocompleteInputMunicipalitiesProps) {
  const { state, actions, dispatch } = useContext<IAutocompleteInputMunContext>(
    AutocompleteInputMunContext
  );
  const { getMunicipalities, getMunicipalityById } = actions;
  const { data: municipalities } = state.municipalities;
  const { data: municipality } = state.municipality;

  const getAutocompleteValues = (): IAutocompleteValue[] => {
    const values: IAutocompleteValue[] = [];

    if (municipalities.data && municipalities.data.length > 0) {
      municipalities.data.forEach((municipality) => {
        const value: IAutocompleteValue = {
          id: municipality.id,
          name: municipality.name,
          additionalId: municipality.catalogId,
        };

        values.push(value);
      });
    }

    return values;
  };

  useEffect(() => {
    if (municipalityId && municipalityId !== 0)
      getMunicipalityById({ id: municipalityId })(dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [municipalityId]);

  const getMunicipalitiesDispatch = (value?: string | null) => {
    getMunicipalities({
      searchQuery: value ? value.toLowerCase().trim() : null,
      federalEntityId: federalEntityId,
    })(dispatch);
  };

  useEffect(() => {
    getMunicipalitiesDispatch(query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, federalEntityId]);

  return (
    <AutocompleteInput
      showCreateItem={false}
      disabled={disabled}
      items={getAutocompleteValues()}
      defaultValue={
        municipality.data && municipality.data.name
          ? municipality.data.name
          : null
      }
      onClick={onClick}
      onClear={() =>
        onClick({
          id: 0,
          name: "",
        } as IAutocompleteValue)
      }
      onChange={(value: string) => getMunicipalitiesDispatch(value)}
      className={className}
      activeSearch={false}
      onlyItemsAdd
    />
  );
}
