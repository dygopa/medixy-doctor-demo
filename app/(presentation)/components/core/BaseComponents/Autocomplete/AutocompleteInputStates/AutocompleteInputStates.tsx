import { IFederalEntity } from "domain/core/entities/federalEntitiesEntity";
import AutocompleteInputStatesProvider from "./context/AutocompleteInputStatesContext";
import States from "./States/States";

interface IAutocompleteInputStatesProps {
  defaultValue?: string;
  setDefaultValue?: boolean;
  itemsAdded?: IFederalEntity[];
  placeholder?: string;
  disabled?: boolean | undefined;
  className?: string;
  onChange?: (item: string) => void;
  onClick?: (item: IFederalEntity) => void;
  federalEntityId?: number | null;
}

export default function AutocompleteInputStates({
  defaultValue = "",
  setDefaultValue = false,
  itemsAdded = [],
  placeholder = "",
  disabled,
  className = "",
  onChange = (item: string) => {},
  onClick = (item: IFederalEntity) => {},
  federalEntityId,
}: IAutocompleteInputStatesProps) {
  return (
    <AutocompleteInputStatesProvider>
      <States
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
