import { IAutocompleteValue } from "../AutocompleteInput";
import AutocompleteInputMedicinesProvider from "./context/AutocompleteInputMedicinesContext";
import Medicines from "./Medicines/Medicines";

interface IAutocompleteInputMedicinesProps {
  onClick: (item: IAutocompleteValue) => void;
  onChange?: (item: string) => void;
  placeholder?: string | undefined;
  defaultValue?: string | null;
  className?: string;
  disabled?: boolean;
}

export default function AutocompleteInputMedicines({
  onClick,
  onChange,
  className,
  placeholder,
  defaultValue,
  disabled = false,
}: IAutocompleteInputMedicinesProps) {
  return (
    <AutocompleteInputMedicinesProvider>
      <Medicines
        onClick={onClick}
        className={className}
        placeholder={placeholder}
        defaultValue={defaultValue}
        disabled={disabled}
      />
    </AutocompleteInputMedicinesProvider>
  );
}
