import Input from "./Input/Input";

interface IListEntity {
  title: string;
  value: number;
}

interface IAutocompleteInputProps {
  defaultValue?: string;
  setDefaultValue?: boolean;
  itemsAdded?: IListEntity[];
  placeholder?: string;
  disabled?: boolean | undefined;
  className?: string;
  onChange?: (item: string) => void;
  onClick?: (item: IListEntity) => void;
  federalEntityId?: number | null;
}

export default function AutocompleteInput({
  defaultValue = "",
  setDefaultValue = false,
  itemsAdded = [],
  placeholder = "",
  disabled,
  className = "",
  onChange = (item: string) => {},
  onClick = (item: IListEntity) => {},
  federalEntityId,
}: IAutocompleteInputProps) {
  return (
    <AutocompleteInputStatesProvider>
      <Input
        disabled={disabled}
        defaultValue={defaultValue}
        setDefaultValue={setDefaultValue}
        itemsAdded={itemsAdded}
        placeholder={placeholder}
        className={className}
        onClick={onClick}
        onChange={onChange}
        federalEntityId={federalEntityId}
      />
    </AutocompleteInputStatesProvider>
  );
}