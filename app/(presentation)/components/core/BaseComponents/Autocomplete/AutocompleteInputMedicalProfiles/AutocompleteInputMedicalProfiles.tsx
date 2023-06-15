import { IMedicalProfile } from "domain/core/entities/medicalProfileEntity";
import AutocompleteInputMedicalProfilesProvider from "./context/AutocompleteInputMedicalProfilesContext";
import MedicalProfiles from "./MedicalProfiles/MedicalProfiles";

interface IAutocompleteInputMedicalProfilesProps {
  defaultValue?: string;
  setDefaultValue?: boolean;
  itemsAdded?: IMedicalProfile[];
  placeholder?: string;
  disabled?: boolean | undefined;
  className?: string;
  onKeyDown?: (item: IMedicalProfile) => void;
  onClick?: (item: IMedicalProfile) => void;
  onChange?: (item: IMedicalProfile) => void | null;
}

export default function AutocompleteInputMedicalProfiles({
  defaultValue = "",
  setDefaultValue = false,
  itemsAdded = [],
  placeholder = "",
  disabled,
  className = "",
  onClick = (item: IMedicalProfile) => {},
  onKeyDown = (item: IMedicalProfile) => {},
  onChange,
}: IAutocompleteInputMedicalProfilesProps) {
  return (
    <AutocompleteInputMedicalProfilesProvider>
      <MedicalProfiles
        disabled={disabled}
        defaultValue={defaultValue}
        setDefaultValue={setDefaultValue}
        itemsAdded={itemsAdded}
        placeholder={placeholder}
        className={className}
        onClick={onClick}
        onKeyDown={onKeyDown}
        onChange={onChange}
      />
    </AutocompleteInputMedicalProfilesProvider>
  );
}
