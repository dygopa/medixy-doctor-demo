import { useContext, useEffect } from "react";
import AutocompleteInput, { IAutocompleteValue } from "../AutocompleteInput";
import {
  AutocompleteInputMedicinesContext,
  IAutocompleteInputMedicinesContext,
} from "./context/AutocompleteInputMedicinesContext";

interface IAutocompleteInputMedicinesProps {
  onClick: (item: IAutocompleteValue) => void;
  className?: string;
}

export default function AutocompleteInputMedicines({
  onClick,
  className,
}: IAutocompleteInputMedicinesProps) {
  const { state, actions, dispatch } =
    useContext<IAutocompleteInputMedicinesContext>(
      AutocompleteInputMedicinesContext
    );
  const { getMedicines } = actions;
  const { data: medicines, loading } = state.medicines;

  const getAutocompleteValues = (): IAutocompleteValue[] => {
    const values: IAutocompleteValue[] = [];

    if (medicines.data.length > 0) {
      medicines.data.forEach((medicine) => {
        const value: IAutocompleteValue = {
          id: medicine.id ?? 0,
          name: medicine.name,
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
      disabled={loading}
      items={getAutocompleteValues()}
      onClick={onClick}
      onClear={() =>
        onClick({
          id: 0,
          name: "",
        } as IAutocompleteValue)
      }
      onChange={(value: string) => getMedicinesDispatch(value)}
      className={className}
      activeSearch={false}
      onlyItemsAdd
    />
  );
}
