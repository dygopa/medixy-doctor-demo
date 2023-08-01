import { IAutocompleteData } from "./context/AutocompleteActions";
import AutocompleteProvider from "./context/AutocompleteContext";
import Input from "./Input/Input";

interface IAutocompleteInputProps {
  defaultValue?: string;
  setDefaultValue?: boolean;
  itemsAdded?: IAutocompleteData[];
  typeAutocomplete: "SPECIALTIES" | "SERVICES_CATEGORIES";
  placeholder?: string;
  disabled?: boolean | undefined;
  className?: string;
  onChange?: (item: string) => void;
  onClick?: (item: IAutocompleteData) => void;
  valueId?: number | null;
  doctorId: number;
}

export default function AutocompleteInput({
  defaultValue = "",
  setDefaultValue = false,
  itemsAdded = [],
  typeAutocomplete = "SPECIALTIES",
  placeholder = "",
  disabled,
  className = "",
  onChange = (item: string) => {},
  onClick = (item: IAutocompleteData) => {},
  valueId,
  doctorId,
}: IAutocompleteInputProps) {
  return (
    <AutocompleteProvider>
      <Input
        disabled={disabled}
        defaultValue={defaultValue}
        setDefaultValue={setDefaultValue}
        itemsAdded={itemsAdded}
        typeAutocomplete={typeAutocomplete}
        placeholder={placeholder}
        className={className}
        onClick={onClick}
        onChange={onChange}
        valueId={valueId}
        doctorId={doctorId}
      />
    </AutocompleteProvider>
  );
}
