import {
  FormInput,
  FormSelect,
} from "(presentation)/components/core/BaseComponents/Form";
import {
  useState,
  useContext,
  useMemo,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import Button from "(presentation)/components/core/BaseComponents/Button";
import {
  ILocalitiesContext,
  LocalitiesContext,
} from "../../../context/LocalitiesContext";
import {
  IStepByStepContext,
  StepByStepContext,
} from "(presentation)/components/core/StepByStepPopup/context/StepByStepContext";
import AddressAutocomplete from "(presentation)/components/core/BaseComponents/Autocomplete/AddressAutocomplete/AddressAutocomplete";
import StepPopup from "./StepPopup/StepPopup";

export default function LocalityCreateFormulary({
  userId,
  setStep,
  setData,
  data,
  addressData,
  setAddressData,
}: {
  userId: string;
  setStep: Dispatch<SetStateAction<number>>;
  data: any;
  addressData: any;
  setData: any;
  setAddressData: any;
}) {
  const { actions, dispatch } =
    useContext<ILocalitiesContext>(LocalitiesContext);

  const { getUserBaseServices } = actions;

  const { state: stateSteps } =
    useContext<IStepByStepContext>(StepByStepContext);
  const { data: steps, successful } = stateSteps.getStepsMessages;

  const [showStepPopup, setShowStepPopup] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    code: "",
    latitude: 0,
    longitude: 0,
    isVirtual: 0,
    isPublic: 1,
  });

  const [address, setAddress] = useState({
    postal_code: "",
    city: "",
    clues: "",
    federalEntity: 0,
    municipality: 0,
    municipalityCatalogId: 0,
    countryLocation: "",
    street: "",
    address: "",
  });

  useEffect(() => {
    if (steps && steps.length === 0 && successful) {
      setTimeout(() => {
        setShowStepPopup(true);
      }, 2000);
    }
  }, [steps, successful]);

  useMemo(() => {
    if (userId) getUserBaseServices(userId)(dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const getDisabledButton = () => {
    if (
      formData?.name === "" ||
      address?.postal_code === "" ||
      address?.federalEntity === 0
    ) {
      return true;
    }

    return false;
  };

  useEffect(() => {
    setFormData(data);
    setAddress(addressData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="w-full md:flex justify-between items-center sticky top-[67px] z-[50] border-b bg-slate-100 py-2">
        <div className="lg:mr-5 mb-4 md:mb-0">
          <h2 className=" text-2xl font-bold truncate">Nuevo Consultorio</h2>
        </div>
        <Button
          className="w-full md:w-fit"
          disabled={getDisabledButton()}
          onClick={() => {
            setData(formData);
            setAddressData(address);
            setStep(1);
          }}
          variant="primary"
        >
          Continuar
        </Button>
      </div>
      <div className="lg:flex justify-center lg:mt-5 mt-8">
        <div className="relative flex justify-center items-start gap-4 w-full lg:w-[70%]">
          <div className="bg-white w-full shadow-xl shadow-slate-100 rounded-md h-fit p-7">
            <div className="w-full flex flex-wrap justify-between items-center gap-6 relative">
              <div className="w-full border-b mb-2">
                <p className="font-medium text-base text-slate-900 pb-2">
                  Definición del Consultorio
                </p>
              </div>

              <div className="lg:flex justify-between items-center relative w-full gap-3">
                <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
                  Nombre del Consultorio
                  <span className="text-primary font-bold">*</span>
                </p>
                <FormInput
                  type={"text"}
                  placeholder="Escribe el nombre del consultorio"
                  min={0}
                  value={formData.name}
                  className="form-control lg:w-[70%]"
                  onChange={(e: any) => {
                    setFormData({ ...formData, name: e.target.value });
                  }}
                />
              </div>
              <div className="lg:flex justify-between items-center relative w-full gap-3">
                <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
                  Tipo de Consultorio{" "}
                  <span className="text-primary font-bold">*</span>
                </p>
                <FormSelect
                  className="form-control lg:w-[70%]"
                  onChange={(e: any) =>
                    setFormData({
                      ...formData,
                      isVirtual: +e.target.value,
                    })
                  }
                >
                  <option value={0}>Físico</option>
                  <option value={1}>Virtual</option>
                </FormSelect>
              </div>
              <div className="lg:flex justify-between items-center relative w-full gap-3">
                <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
                  Sector <span className="text-primary font-bold">*</span>
                </p>
                <FormSelect
                  className="form-control lg:w-[70%]"
                  onChange={(e: any) =>
                    setFormData({
                      ...formData,
                      isPublic: +e.target.value,
                    })
                  }
                >
                  <option value={0}>Privado</option>
                  <option value={1}>Público</option>
                </FormSelect>
              </div>

              <AddressAutocomplete
                formData={address}
                setFormData={setAddress}
                showPostalCode
              />

              <div className="lg:flex justify-between items-center relative w-full gap-3">
                <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
                  Calle
                </p>
                <FormInput
                  type={"text"}
                  placeholder="Escribe la calle"
                  min={0}
                  defaultValue={address.street}
                  className="form-control lg:w-[70%]"
                  onChange={(e: any) => {
                    setAddress({ ...address, street: e.target.value });
                  }}
                />
              </div>
              <div className="lg:flex justify-between items-center relative w-full gap-3">
                <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
                  CLUES
                </p>
                <FormInput
                  type={"text"}
                  placeholder="Escribe el CLUES del consultorio"
                  min={0}
                  value={address.clues}
                  className="form-control lg:w-[70%]"
                  onChange={(e: any) => {
                    setAddress({ ...address, clues: e.target.value });
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <StepPopup isVisible={showStepPopup} userId={userId} />
    </>
  );
}
