import { IAutocompleteValue } from "../AutocompleteInput";
import AutocompleteInputServicesProvider from "./context/AutocompleteInputServicesContext";
import Services from "./Services/Services";

interface IAutocompleteInputServicesProps {
  onClick: (item: IAutocompleteValue) => void;
  onChange?: (item: string) => void;
  placeholder?: string | undefined;
  defaultValue?: string | null;
  className?: string;
  doctorId: number;
}

export default function AutocompleteInputServices({
  onClick,
  onChange,
  className,
  placeholder,
  defaultValue,
  doctorId,
}: IAutocompleteInputServicesProps) {
  return (
    <AutocompleteInputServicesProvider>
      <Services
        onClick={onClick}
        onChange={onChange}
        className={className}
        placeholder={placeholder}
        defaultValue={defaultValue}
        doctorId={doctorId}
      />
    </AutocompleteInputServicesProvider>
  );
}
