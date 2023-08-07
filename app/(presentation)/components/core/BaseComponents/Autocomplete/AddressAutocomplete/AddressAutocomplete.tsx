import { SetStateAction, useState } from "react";
import AutocompleteInputStates from "../AutocompleteInputStates/AutocompleteInputStates";
import AutocompleteInputMunicipalities from "../AutocompleteInputMunicipalities/AutocompleteInputMunicipalities";
import AutocompleteInputLocations from "../AutocompleteInputLocations/AutocompleteInputLocations";
import { IAutocompleteValue } from "../AutocompleteInput";

function AddressAutocomplete({
  formData, setFormData
}:{
  formData:any;
  setFormData:SetStateAction<{}>;
}) {

  const [addressData, setAddressData] = useState({
    federalEntityId: 0,
    municipalityId: 0,
    municipalityCatalogId: 0,
    locationId: 0
  })
  
  return <>
    <div className="lg:flex justify-between items-center relative w-full gap-3">
      <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
        Estado
        <span className="text-primary font-bold">*</span>
      </p>
      <div className="lg:w-[70%]">
        <AutocompleteInputStates
          onClick={(item:IAutocompleteValue) =>
            setAddressData({
              ...addressData,
              federalEntityId: item.id,
              municipalityId: 0,
              municipalityCatalogId: 0,
              locationId: 0,
            })
          }
          onChange={(e: string) => {
            if (e.length === 0) {
              setAddressData({
                ...addressData,
                federalEntityId: 0,
                municipalityId: 0,
                municipalityCatalogId: 0,
                locationId: 0,
              });
            }
          }}
          className="form-control lg:w-full"
        />
      </div>
    </div>
    <div className="lg:flex justify-between items-center relative w-full gap-3">
      <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
        Municipio
      </p>
      <div className="lg:w-[70%]">
        <AutocompleteInputMunicipalities
          onClick={(item: IAutocompleteValue) =>
            setAddressData({
              ...addressData,
              municipalityId: item.id,
              municipalityCatalogId: item.additionalId,
              locationId: 0,
            })
          }
          onChange={(e: string) => {
            if (e.length === 0) {
              setAddressData({
                ...addressData,
                municipalityId: 0,
                municipalityCatalogId: 0,
                locationId: 0,
              });
            }
          }}
          disabled={addressData.federalEntityId === 0}
          className="form-control lg:w-full"
          federalEntityId={addressData.federalEntityId}
        />
      </div>
    </div>
    <div className="lg:flex justify-between items-center relative w-full gap-3">
      <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
        Colonia
      </p>
      <div className="lg:w-[70%]">
        <AutocompleteInputLocations
          onClick={(item: IAutocompleteValue) =>
            setAddressData({ ...addressData, locationId: item.id })
          }
          onChange={(e: string) => {
            if (e.length === 0) {
              setAddressData({ ...addressData, locationId: 0 });
            }
          }}
          disabled={addressData.municipalityId === 0}
          className="form-control lg:w-full"
          municipalityId={addressData.municipalityId}
          federalEntityId={addressData.federalEntityId}
        />
      </div>
    </div>
  </>;
}

export default AddressAutocomplete