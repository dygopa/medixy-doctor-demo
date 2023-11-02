import { useContext, useEffect } from "react";
import AutocompleteInput, { IAutocompleteValue } from "../AutocompleteInput";
import {
  AutocompleteInputPostalContext,
  IAutocompleteInputPostalContext,
} from "./context/AutocompleteInputPostalContext";

interface IAutocompleteInputPostalProps {
  query?: string | null;
  onClick: (item: IAutocompleteValue) => void;
  className?: string;
  postalCodeDefault?: string | null;
}

export default function AutocompleteInputPostal({
  query,
  onClick,
  className,
  postalCodeDefault,
}: IAutocompleteInputPostalProps) {
  const { state, actions, dispatch } =
    useContext<IAutocompleteInputPostalContext>(AutocompleteInputPostalContext);
  const { getPostalCodes, getPostalCodeByPostalCode } = actions;
  const { data: postalCodes, loading } = state.postalCodes;
  const { data: postalCode } = state.postalCode;

  const getAutocompleteValues = (): IAutocompleteValue[] => {
    const values: IAutocompleteValue[] = [];

    if (postalCodes.data && postalCodes.data.length > 0) {
      postalCodes.data.forEach((postalCode) => {
        const value: IAutocompleteValue = {
          id: postalCode.id,
          name: `${postalCode.postalCode} - ${
            postalCode.federalEntity?.nameEntity ?? ""
          }, ${postalCode.municipality?.name ?? ""}, ${postalCode.settlement}`,
          additionalId: postalCode.federalEntityId,
          secondAdditionalId: postalCode.catalogId,
          thirdAdditionalId: postalCode.municipality.id ?? 0,
          text: postalCode.settlement,
        };

        values.push(value);
      });
    }

    return values;
  };

  const getPostalCodesDispatch = (value?: string | null) => {
    getPostalCodes({
      searchQuery: value ? value.toLowerCase().trim() : null,
    })(dispatch);
  };

  /* useEffect(() => {
    if (postalCodeDefault && postalCodeDefault !== "")
      getPostalCodeByPostalCode({ postalCode: postalCodeDefault })(dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postalCodeDefault]); */

  useEffect(() => {
    getPostalCodesDispatch(query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <AutocompleteInput
      showCreateItem={false}
      items={getAutocompleteValues()}
      defaultValue={postalCodeDefault}
      onClick={onClick}
      onClear={() =>
        onClick({
          id: 0,
          name: "",
          additionalId: 0,
          secondAdditionalId: 0,
          thirdAdditionalId: 0,
          text: null,
        } as IAutocompleteValue)
      }
      onChange={(value: string) => getPostalCodesDispatch(value)}
      className={className}
      activeSearch={false}
      onlyItemsAdd
    />
  );
}
