import { useContext, useEffect } from "react";
import AutocompleteInput, { IAutocompleteValue } from "../../AutocompleteInput";
import {
  AutocompleteInputServicesContext,
  IAutocompleteInputServicesContext,
} from "../context/AutocompleteInputServicesContext";

interface IServicesProps {
  onClick: (item: IAutocompleteValue) => void;
  onChange?: (item: string) => void;
  placeholder?: string | undefined;
  defaultValue?: string | null;
  className?: string;
  doctorId: number;
}

export default function Services({
  onClick,
  onChange,
  placeholder,
  defaultValue,
  className,
  doctorId,
}: IServicesProps) {
  const { state, actions, dispatch } =
    useContext<IAutocompleteInputServicesContext>(
      AutocompleteInputServicesContext
    );
  const { getServicesCategories } = actions;
  const { data: categories, loading } = state.servicesCategories;

  const getAutocompleteValues = (): IAutocompleteValue[] => {
    const values: IAutocompleteValue[] = [];

    if (categories && categories.length > 0) {
      categories.forEach((category: any) => {
        const value: IAutocompleteValue = {
          id: category.id ?? 0,
          name: category.nombre,
        };

        values.push(value);
      });
    }

    return values;
  };

  const getServicesCategoriesDispatch = (value: string) => {
    getServicesCategories({
      doctorId: doctorId,
      searchQuery: value.toLowerCase().trim(),
    })(dispatch);
  };

  useEffect(() => {
    getServicesCategoriesDispatch("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AutocompleteInput
      showCreateItem={true}
      items={getAutocompleteValues()}
      placeholder={placeholder}
      defaultValue={defaultValue}
      onlyItemsAdd
      onClick={onClick}
      onClear={() =>
        onClick({
          id: 0,
          name: "",
        } as IAutocompleteValue)
      }
      onChange={(value: string) => {
        getServicesCategoriesDispatch(value);

        if (onChange) onChange(value);
      }}
      className={className}
      activeSearch={false}
      showClearButton={false}
    />
  );
}
