import { useContext, useEffect } from "react";
import AutocompleteInput, { IAutocompleteValue } from "../AutocompleteInput";
import {
  AutocompleteInputStatesContext,
  IAutocompleteInputStatesContext,
} from "./context/AutocompleteInputStatesContext";

interface IAutocompleteInputStatesProps {
  query?: string | null;
  onClick: (item: IAutocompleteValue) => void;
  className?: string;
  federalEntityId?: number | null;
}

export default function AutocompleteInputStates({
  query,
  onClick,
  className,
  federalEntityId,
}: IAutocompleteInputStatesProps) {
  const { state, actions, dispatch } =
    useContext<IAutocompleteInputStatesContext>(AutocompleteInputStatesContext);
  const { getFederalEntities, getFederalEntityById } = actions;
  const { data: federalEntities, loading } = state.federalEntities;
  const { data: federalEntity } = state.federalEntity;

  const getAutocompleteValues = (): IAutocompleteValue[] => {
    const values: IAutocompleteValue[] = [];

    if (federalEntities.length > 0) {
      federalEntities.forEach((federalEntity) => {
        const value: IAutocompleteValue = {
          id: federalEntity.entityId,
          name: federalEntity.nameEntity,
        };

        values.push(value);
      });
    }

    return values;
  };

  const getFederalEntitiesDispatch = (value?: string | null) => {
    getFederalEntities({
      searchQuery: value ? value.toLowerCase().trim() : null,
    })(dispatch);
  };

  useEffect(() => {
    if (federalEntityId && federalEntityId !== 0)
      getFederalEntityById({ id: federalEntityId })(dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [federalEntityId]);

  useEffect(() => {
    getFederalEntitiesDispatch(query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <AutocompleteInput
      showCreateItem={false}
      items={getAutocompleteValues()}
      defaultValue={
        federalEntity && federalEntity.nameEntity
          ? federalEntity.nameEntity
          : undefined
      }
      onClick={onClick}
      onClear={() =>
        onClick({
          id: 0,
          name: "",
        } as IAutocompleteValue)
      }
      onChange={(value: string) => getFederalEntitiesDispatch(value)}
      className={className}
      activeSearch={false}
      onlyItemsAdd
    />
  );
}
