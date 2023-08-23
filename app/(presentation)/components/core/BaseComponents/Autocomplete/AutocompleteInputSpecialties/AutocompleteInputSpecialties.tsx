import { IAutocompleteValue } from "../AutocompleteInput";
import AutocompleteInputSpecialtiesProvider from "./context/AutocompleteInputSpecialtiesContext";
import Specialties from "./Specialties/Specialties";

interface IAutocompleteInputSpecialtiesProps {
  onClick: (item: IAutocompleteValue) => void;
  onChange?: (item: string) => void;
  placeholder?: string | undefined;
  defaultValue?: string | null;
  className?: string;
  doctorId?: number | null;
}

export default function AutocompleteInputSpecialties({
  onClick,
  onChange,
  className,
  placeholder,
  defaultValue,
  doctorId,
}: IAutocompleteInputSpecialtiesProps) {
  return (
    <AutocompleteInputSpecialtiesProvider>
      <Specialties
        onClick={onClick}
        onChange={onChange}
        className={className}
        placeholder={placeholder}
        defaultValue={defaultValue}
        doctorId={doctorId}
      />
    </AutocompleteInputSpecialtiesProvider>
  );
}
