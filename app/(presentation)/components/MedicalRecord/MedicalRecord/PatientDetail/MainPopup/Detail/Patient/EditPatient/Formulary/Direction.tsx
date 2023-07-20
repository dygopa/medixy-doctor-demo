import {
  FormInput,
  FormSelect,
} from "(presentation)/components/core/BaseComponents/Form";
import {
  IMedicalRecordContext,
  MedicalRecordContext,
} from "(presentation)/components/MedicalRecord/MedicalRecord/context/MedicalRecordContext";
import { ICountryLocation } from "domain/core/entities/countryEntity";
import { IMunicipality } from "domain/core/entities/municipalityEntity";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
} from "react";

interface IContactProps {
  values: {
    id: number;
    name: string;
    lastname: string;
    motherlastname: string;
    age: string;
    curp: string;
    sex: number;
    gender: number;
    phone: string;
    country: string;
    email: string;
    birthDate: string;
    federalEntity: number;
    municipality: number;
    countryLocation: number;
    city: string;
    direction: string;
    street: string;
    pictureUrl: string;
  };
  setValues: Dispatch<
    SetStateAction<{
      id: number;
      name: string;
      lastname: string;
      motherlastname: string;
      age: string;
      curp: string;
      sex: number;
      gender: number;
      phone: string;
      country: string;
      email: string;
      birthDate: string;
      federalEntity: number;
      municipality: number;
      countryLocation: number;
      city: string;
      direction: string;
      street: string;
      pictureUrl: string;
    }>
  >;
  errors: {
    global: string;
    name: string;
    lastname: string;
    motherlastname: string;
    age: string;
    curp: string;
    sex: string;
    country: string;
    email: string;
    phone: string;
    federalEntity: string;
  };
  setErrors: Dispatch<
    SetStateAction<{
      global: string;
      name: string;
      lastname: string;
      motherlastname: string;
      age: string;
      curp: string;
      sex: string;
      country: string;
      email: string;
      phone: string;
      federalEntity: string;
    }>
  >;
}
export default function Contact({ values, setValues, errors, setErrors }: IContactProps) {
  const { state, actions, dispatch } =
    useContext<IMedicalRecordContext>(MedicalRecordContext);
  const { getFederalEntities, getMunicipalities, getCountryLocations } = actions;
  const { data: federalEntities } = state.getFederalEntities;
  const { data: municipalities, successful } = state.municipalities;
  const { data: countryLocations } = state.countryLocations;

  useEffect(() => {
    getMunicipalities({
      federalEntityId: values.federalEntity,
    })(dispatch);
  }, [values.federalEntity])

  useMemo(() => {
    if (successful) {
      if (municipalities.data.length > 0) {
        const municipalitySearch = municipalities.data.find((elem) => {
          return elem.id === values.municipality;
        })
        getCountryLocations({
          federalEntityId: values.federalEntity,
          municipalityId: municipalitySearch?.catalogId,
        })(dispatch);
      }
    }
  }, [values.federalEntity, values.municipality, successful])

  useEffect(() => {
    getFederalEntities()(dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full bg-white  rounded-md h-fit mt-4">
      <div className="w-full rounded-md p-5 flex">
        <div className="w-full flex flex-wrap justify-between items-center gap-6 relative">
          <div className="w-full border-b mb-2">
            <p className="font-medium text-base text-slate-900 pb-2">
              Dirección
            </p>
          </div>
          <div className="w-full md:grid md:grid-cols-2 grid-cols-1 justify-start items-center gap-3">
            <div className="md:flex md:flex-col justify-between items-start relative gap-1">
              <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
                Entidad Federativa{" "}<span className="text-primary font-bold">*</span>
              </p>
              <FormSelect
                className="form-control w-full"
                defaultValue={values.federalEntity}
                value={values.federalEntity}
                onChange={(e: any) =>
                  setValues({ ...values, federalEntity: parseInt(e.target.value) })
                }
              >
                {federalEntities.map((elem) => (
                  <option key={elem.entityId} value={elem.entityId}>
                    {elem.nameEntity}
                  </option>
                ))}
              </FormSelect>

              {errors.federalEntity && (
                <p className="text-danger mt-1">
                  Debe seleccionar la entidad federativa
                </p>
              )}
            </div>
            <div className="md:flex md:flex-col justify-between items-start relative gap-1">
              <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
                Municipio
              </p>
              <FormSelect
                className="form-control w-full"
                disabled={values.federalEntity === 0}
                defaultValue={values.municipality}
                value={values.municipality}
                onChange={(e: any) =>
                  setValues({ ...values, municipality: parseInt(e.target.value) })
                }
              >
                {municipalities.data?.map((elem: IMunicipality) => (
                    <option key={elem.id} value={elem.id}>
                      {elem.name}
                    </option>
                  ))
                }
              </FormSelect>
            </div>
            <div className="md:flex md:flex-col justify-between items-start relative gap-1">
              <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
                Localidad
              </p>
              <FormSelect
                className="form-control w-full"
                disabled={values.municipality === 0 || values.federalEntity === 0}
                defaultValue={values.countryLocation}
                value={values.countryLocation}
                onChange={(e: any) =>
                  setValues({ ...values, countryLocation: parseInt(e.target.value) })
                }
              >
                {countryLocations.data?.map((elem: ICountryLocation) => (
                    <option key={elem.id} value={elem.id}>
                      {elem.name}
                    </option>
                  ))
                }
              </FormSelect>
            </div>
            <div className="my-3 md:my-0 md:flex md:flex-col justify-between items-start relative gap-1">
              <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
                Ciudad
              </p>
              <FormInput
                type={"text"}
                placeholder="Ciudad"
                min={0}
                value={values.city}
                className="form-control w-full"
                onChange={(e: any) => {
                  setValues({ ...values, city: e.target.value });
                }}
              />
            </div>
            <div className="lex col-span-2 flex-col justify-between items-start relative gap-1">
              <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
                Calle
              </p>
              <FormInput
                type={"text"}
                placeholder="Calle"
                min={0}
                value={values.street}
                className="form-control w-full"
                onChange={(e: any) => {
                  setValues({ ...values, street: e.target.value });
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
