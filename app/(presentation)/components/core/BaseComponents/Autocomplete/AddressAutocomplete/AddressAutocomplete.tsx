import { SetStateAction, useEffect, useMemo, useState } from "react";
import AutocompleteInputStates from "../AutocompleteInputStates/AutocompleteInputStates";
import AutocompleteInputMunicipalities from "../AutocompleteInputMunicipalities/AutocompleteInputMunicipalities";
import { IAutocompleteValue } from "../AutocompleteInput";
import AutocompleteInputStatesProvider from "../AutocompleteInputStates/context/AutocompleteInputStatesContext";
import AutocompleteInputMunProvider from "../AutocompleteInputMunicipalities/context/AutocompleteInputMunContext";
import AutocompleteInputLocations from "../AutocompleteInputLocations/AutocompleteInputLocations";
import AutocompleteInputLocationsProvider from "../AutocompleteInputLocations/context/AutocompleteInputLocationsContext";
import { twMerge } from "tailwind-merge";

function AddressAutocomplete({
  formData,
  setFormData,
  federalEntityId,
  municipalityId,
  municipalityCatalogId,
  locationId,
  isColumn = false,
}: {
  formData: any;
  setFormData: SetStateAction<any>;
  federalEntityId?: number | null;
  municipalityId?: number | null;
  municipalityCatalogId?: number | null;
  locationId?: number | null;
  isColumn?: boolean;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [addressData, setAddressData] = useState({
    federalEntityId: 0,
    municipalityId: 0,
    municipalityCatalogId: 0,
    locationId: 0,
  });

  const setDefaultAddressData = () => {
    setAddressData({
      ...addressData,
      federalEntityId: federalEntityId ?? 0,
      municipalityId: municipalityId ?? 0,
      municipalityCatalogId: municipalityCatalogId ?? 0,
      locationId: locationId ?? 0,
    });

    setIsLoading(false);
  };

  useEffect(() => {
    setDefaultAddressData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [federalEntityId, municipalityId, municipalityCatalogId, locationId]);

  if (isLoading) return <div />;

  return (
    <>
      <div
        className={twMerge([
          "lg:flex relative w-full",
          isColumn
            ? "flex-col justify-start gap-1"
            : "justify-between items-center gap-3",
        ])}
      >
        <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
          Estado
          <span className="text-primary font-bold">*</span>
        </p>
        <div className={twMerge([isColumn ? "w-full" : "lg:w-[70%]"])}>
          <AutocompleteInputStatesProvider>
            <AutocompleteInputStates
              onClick={(item: IAutocompleteValue) => {
                setAddressData({
                  ...addressData,
                  federalEntityId: item.id,
                  municipalityId: 0,
                  municipalityCatalogId: 0,
                  locationId: 0,
                });
                setFormData({
                  ...formData,
                  federalEntity: item.id,
                  municipality: 0,
                  municipalityCatalogId: 0,
                  countryLocation: 0,
                });
              }}
              federalEntityId={addressData.federalEntityId}
              className="form-control lg:w-full"
            />
          </AutocompleteInputStatesProvider>
        </div>
      </div>
      <div
        className={twMerge([
          "lg:flex relative w-full",
          isColumn
            ? "flex-col justify-start gap-1"
            : "justify-between items-center gap-3",
        ])}
      >
        <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
          Municipio
        </p>
        <div className={twMerge([isColumn ? "w-full" : "lg:w-[70%]"])}>
          <AutocompleteInputMunProvider>
            <AutocompleteInputMunicipalities
              onClick={(item: IAutocompleteValue) => {
                setAddressData({
                  ...addressData,
                  municipalityId: item.id,
                  municipalityCatalogId: item.additionalId ?? 0,
                  locationId: 0,
                });
                setFormData({
                  ...formData,
                  municipality: item.id,
                  municipalityCatalogId: item.additionalId ?? 0,
                  countryLocation: 0,
                });
              }}
              disabled={addressData.federalEntityId === 0}
              className="form-control lg:w-full"
              federalEntityId={addressData.federalEntityId}
              municipalityId={addressData.municipalityId}
            />
          </AutocompleteInputMunProvider>
        </div>
      </div>
      <div
        className={twMerge([
          "lg:flex relative w-full",
          isColumn
            ? "flex-col justify-start gap-1"
            : "justify-between items-center gap-3",
        ])}
      >
        <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
          Colonia
        </p>
        <div className={twMerge([isColumn ? "w-full" : "lg:w-[70%]"])}>
          <AutocompleteInputLocationsProvider>
            <AutocompleteInputLocations
              onClick={(item: IAutocompleteValue) => {
                setAddressData({ ...addressData, locationId: item.id });
                setFormData({
                  ...formData,
                  countryLocation: item.id,
                });
              }}
              disabled={addressData.municipalityId === 0}
              className="form-control lg:w-full"
              countryLocationId={addressData.locationId}
              municipalityCatalogId={addressData.municipalityCatalogId}
              federalEntityId={addressData.federalEntityId}
            />
          </AutocompleteInputLocationsProvider>
        </div>
      </div>
    </>
  );
}

export default AddressAutocomplete;
