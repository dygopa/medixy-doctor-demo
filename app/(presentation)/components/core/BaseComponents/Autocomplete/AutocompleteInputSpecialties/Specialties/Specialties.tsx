import { useContext, useEffect } from "react";
import AutocompleteInput, { IAutocompleteValue } from "../../AutocompleteInput";
import {
  AutocompleteInputSpecialtiesContext,
  IAutocompleteInputSpecialtiesContext,
} from "../context/AutocompleteInputSpecialtiesContext";

interface ISpecialtiesProps {
  onClick: (item: IAutocompleteValue) => void;
  onChange?: (item: string) => void;
  placeholder?: string | undefined;
  defaultValue?: string | null;
  className?: string;
  doctorId?: number | null;
}

export default function Specialties({
  onClick,
  onChange,
  placeholder,
  defaultValue,
  className,
  doctorId,
}: ISpecialtiesProps) {
  const { state, actions, dispatch } =
    useContext<IAutocompleteInputSpecialtiesContext>(
      AutocompleteInputSpecialtiesContext
    );
  const { getSpecialties } = actions;
  const { data: specialties, loading } = state.specialties;

  const getAutocompleteValues = (): IAutocompleteValue[] => {
    const values: IAutocompleteValue[] = [];

    if (specialties.data && specialties.data.length > 0) {
      specialties.data.forEach((specialty) => {
        const value: IAutocompleteValue = {
          id: specialty.id ?? 0,
          name: specialty.name,
        };

        values.push(value);
      });
    }

    return values;
  };

  const getSpecialtiesDispatch = (value: string) => {
    getSpecialties({
      searchQuery: value.toLowerCase().trim(),
      doctorId: doctorId,
    })(dispatch);
  };

  useEffect(() => {
    getSpecialtiesDispatch("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AutocompleteInput
      showCreateItem={true}
      items={getAutocompleteValues()}
      placeholder={placeholder}
      defaultValue={defaultValue}
      onClick={onClick}
      onlyItemsAdd
      onClear={() =>
        onClick({
          id: 0,
          name: "",
        } as IAutocompleteValue)
      }
      onChange={(value: string) => {
        getSpecialtiesDispatch(value);

        if (onChange) onChange(value);
      }}
      className={className}
      activeSearch={false}
      showClearButton={false}
    />
  );
}
