import { useContext, useEffect } from "react";
import AutocompleteInput, { IAutocompleteValue } from "../../AutocompleteInput";
import {
  AutocompleteInputCIE10Context,
  IAutocompleteInputCIE10Context,
} from "../context/AutocompleteInputCIE10Context";

interface ICIE10Props {
  onClick: (item: IAutocompleteValue) => void;
  placeholder?: string | undefined;
  className?: string;
}

export default function CIE10({
  onClick,
  className,
  placeholder,
}: ICIE10Props) {
  const { state, actions, dispatch } =
    useContext<IAutocompleteInputCIE10Context>(AutocompleteInputCIE10Context);
  const { getCIE10 } = actions;
  const { data: cie10, loading } = state.cie10;

  const getAutocompleteValues = (): IAutocompleteValue[] => {
    const values: IAutocompleteValue[] = [];

    if (cie10.data && cie10.data.length > 0) {
      cie10.data.forEach((cie10) => {
        const value: IAutocompleteValue = {
          id: cie10.id,
          name: cie10.code4 + " - " + cie10.description4,
        };

        values.push(value);
      });
    }

    return values;
  };

  const getCIE10Dispatch = (value: string) => {
    getCIE10({
      searchQuery: value.toLowerCase().trim(),
    })(dispatch);
  };

  useEffect(() => {
    getCIE10Dispatch("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AutocompleteInput
      items={getAutocompleteValues()}
      placeholder={placeholder}
      onClick={onClick}
      onClear={() =>
        onClick({
          id: 0,
          name: "",
        } as IAutocompleteValue)
      }
      onChange={(value: string) => getCIE10Dispatch(value)}
      className={className}
      showClearButton={false}
      activeSearch={false}
    />
  );
}
