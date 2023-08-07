import { IAutocompleteValue } from "../AutocompleteInput";
import AutocompleteInputMedicalProfilesProvider from "./context/AutocompleteInputMedicalProfilesContext";
import MedicalProfiles from "./MedicalProfiles/MedicalProfiles";

interface IAutocompleteInputMedicalProfilesProps {
  onClick: (item: IAutocompleteValue) => void;
  onChange?: (item: string) => void;
  placeholder?: string | undefined;
  defaultValue?: string | null;
  className?: string;
}

export default function AutocompleteInputMedicalProfiles({
  onClick,
  onChange,
  className,
  placeholder,
  defaultValue,
}: IAutocompleteInputMedicalProfilesProps) {
  return (
    <AutocompleteInputMedicalProfilesProvider>
      <MedicalProfiles
        onClick={onClick}
        onChange={onChange}
        className={className}
        placeholder={placeholder}
        defaultValue={defaultValue}
      />
    </AutocompleteInputMedicalProfilesProvider>
  );
}
