import { ICIE10 } from "domain/core/entities/cie10Entity";
import AutocompleteInputCIE10Provider from "./context/AutocompleteInputCIE10Context";
import CIE10 from "./CIE10/CIE10";

interface IAutocompleteInputCIE10Props {
  defaultValue?: string;
  setDefaultValue?: boolean;
  itemsAdded?: ICIE10[];
  placeholder?: string;
  disabled?: boolean | undefined;
  className?: string;
  onClick?: (item: ICIE10) => void;
}

export default function AutocompleteInputCIE10({
  defaultValue = "",
  setDefaultValue = false,
  itemsAdded = [],
  placeholder = "",
  disabled,
  className = "",
  onClick = (item: ICIE10) => {},
}: IAutocompleteInputCIE10Props) {
  return (
    <AutocompleteInputCIE10Provider>
      <CIE10
        disabled={disabled}
        defaultValue={defaultValue}
        setDefaultValue={setDefaultValue}
        itemsAdded={itemsAdded}
        placeholder={placeholder}
        className={className}
        onClick={onClick}
      />
    </AutocompleteInputCIE10Provider>
  );
}
