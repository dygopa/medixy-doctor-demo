import { IMedicine } from "domain/core/entities/medicineEntity";
import AutocompleteInputMedicinesProvider from "./context/AutocompleteInputMedicinesContext";
import Medicines from "./Medicines/Medicines";

interface IAutocompleteInputMedicinesProps {
  defaultValue?: string;
  setDefaultValue?: boolean;
  itemsAdded?: IMedicine[];
  placeholder?: string;
  disabled?: boolean | undefined;
  className?: string;
  onChange?: (item: string) => void;
  onClick?: (item: IMedicine) => void;
}

export default function AutocompleteInputMedicines({
  defaultValue = "",
  setDefaultValue = false,
  itemsAdded = [],
  placeholder = "",
  disabled,
  className = "",
  onChange = (item: string) => {},
  onClick = (item: IMedicine) => {},
}: IAutocompleteInputMedicinesProps) {
  return (
    <AutocompleteInputMedicinesProvider>
      <Medicines
        disabled={disabled}
        defaultValue={defaultValue}
        setDefaultValue={setDefaultValue}
        itemsAdded={itemsAdded}
        placeholder={placeholder}
        className={className}
        onClick={onClick}
        onChange={onChange}
      />
    </AutocompleteInputMedicinesProvider>
  );
}
