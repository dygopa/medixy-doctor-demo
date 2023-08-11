import { useContext, useEffect } from "react";
import AutocompleteInput, { IAutocompleteValue } from "../../AutocompleteInput";
import {
  AutocompleteInputMedicinesContext,
  IAutocompleteInputMedicinesContext,
} from "../context/AutocompleteInputMedicinesContext";

interface IMedicinesProps {
  onClick: (item: IAutocompleteValue) => void;
  onChange?: (item: string) => void;
  placeholder?: string | undefined;
  defaultValue?: string | null;
  className?: string;
  disabled?: boolean;
}

export default function Medicines({
  onClick,
  onChange,
  placeholder,
  defaultValue,
  className,
  disabled,
}: IMedicinesProps) {
  const { state, actions, dispatch } =
    useContext<IAutocompleteInputMedicinesContext>(
      AutocompleteInputMedicinesContext
    );
  const { getMedicines } = actions;
  const { data: medicines, loading } = state.medicines;

  const getAutocompleteValues = (): IAutocompleteValue[] => {
    const values: IAutocompleteValue[] = [];

    if (medicines.data && medicines.data.length > 0) {
      medicines.data.forEach((medicine) => {
        const value: IAutocompleteValue = {
          id: medicine.id ?? 0,
          name: `${medicine.name} ${
            medicine.company ? `- ${medicine.company}` : ""
          }`,
        };

        values.push(value);
      });
    }

    return values;
  };

  const getMedicinesDispatch = (value: string) => {
    getMedicines({
      searchQuery: value.toLowerCase().trim(),
    })(dispatch);
  };

  useEffect(() => {
    getMedicinesDispatch("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AutocompleteInput
      disabled={disabled}
      items={getAutocompleteValues()}
      onClick={onClick}
      onClear={() =>
        onClick({
          id: 0,
          name: "",
        } as IAutocompleteValue)
      }
      placeholder={placeholder}
      defaultValue={defaultValue}
      onChange={(value: string) => {
        getMedicinesDispatch(value);

        if (onChange) onChange(value);
      }}
      className={className}
      showClearButton={false}
      activeSearch={false}
    />
  );
}
