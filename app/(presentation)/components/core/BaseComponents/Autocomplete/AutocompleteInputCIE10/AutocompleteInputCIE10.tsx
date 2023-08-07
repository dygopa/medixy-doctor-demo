import { IAutocompleteValue } from "../AutocompleteInput";
import CIE10 from "./CIE10/cie10";
import AutocompleteInputCIE10Provider from "./context/AutocompleteInputCIE10Context";

interface IAutocompleteInputCIE10Props {
  onClick: (item: IAutocompleteValue) => void;
  placeholder?: string | undefined;
  className?: string;
}

export default function AutocompleteInputCIE10({
  onClick,
  placeholder,
  className,
}: IAutocompleteInputCIE10Props) {
  return (
    <AutocompleteInputCIE10Provider>
      <CIE10
        onClick={onClick}
        className={className}
        placeholder={placeholder}
      />
    </AutocompleteInputCIE10Provider>
  );
}
