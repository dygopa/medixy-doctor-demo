import {
  FormInput,
  FormSelect,
} from "(presentation)/components/core/BaseComponents/Form";
import {
  IMedicalRecordContext,
  MedicalRecordContext,
} from "(presentation)/components/MedicalRecord/MedicalRecord/context/MedicalRecordContext";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
} from "react";

interface IContactProps {
  values: {
    name: string;
    lastname: string;
    motherlastname: string;
    age: string;
    curp: string;
    gender: number;
    sex: number;
    phone: string;
    country: string;
    birthDate: string;
    email: string;
    federalEntity: number;
    city: string;
    direction: string;
  };
  setValues: Dispatch<
    SetStateAction<{
      name: string;
      lastname: string;
      motherlastname: string;
      age: string;
      curp: string;
      sex: number;
      gender: number;
      birthDate: string;
      phone: string;
      country: string;
      email: string;
      federalEntity: number;
      city: string;
      direction: string;
    }>
  >;
}
export default function Contact({ values, setValues }: IContactProps) {
  const { state, actions, dispatch } =
    useContext<IMedicalRecordContext>(MedicalRecordContext);
  const { getFederalEntities } = actions;
  const { data: federalEntities } = state.getFederalEntities;

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
                Entidad Federativa
              </p>
              <FormSelect
                className="form-control w-full"
                defaultValue={values.federalEntity}
                value={values.federalEntity}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                  setValues({ ...values, federalEntity: +e.target.value });
                }}
              >
                {federalEntities.length > 0 &&
                  federalEntities.map((elem) => (
                    <option key={elem.entityId} value={elem.entityId}>
                      {elem.nameEntity} - {elem.abbrevation}
                    </option>
                  ))}
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
            <div className="flex col-span-2 flex-col justify-between items-start relative gap-1">
              <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
                Dirección Completa
              </p>
              <FormInput
                type={"text"}
                value={values.direction}
                placeholder="Dirección completa de su residencia"
                className="form-control w-full"
                onChange={(e: any) => {
                  setValues({ ...values, direction: e.target.value });
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
