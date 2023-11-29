import Button from "(presentation)/components/core/BaseComponents/Button";
import {
  FormInput,
  FormSelect,
} from "(presentation)/components/core/BaseComponents/Form";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { IUser } from "domain/core/entities/userEntity";
import AlertComponent from "(presentation)/components/core/BaseComponents/Alert";
import {
  IUserContext,
  UserContext,
} from "(presentation)/components/Account/context/UserContext";
import Lucide from "(presentation)/components/core/BaseComponents/Lucide";

export default function Credentials() {
  return (
    <div className="w-full bg-white shadow-xl shadow-slate-100 rounded-md h-fit p-5">
      {/*<AlertComponent
        variant="error"
        show={errorRegister !== null}
        description={"Ha ocurrido un error cargando la especialidad"}
      />
      <AlertComponent
        variant="success"
        show={successFulRegister}
        description="Especialidad cargada exitosamente"
      />*/}

      <div className="border w-full rounded-md p-5 flex">
        <div className="w-full flex flex-wrap justify-between items-center gap-6 relative">
          <div className="w-full border-b mb-2">
            <p className="font-medium text-base text-slate-900 pb-2">
              Credenciales
            </p>
          </div>
          <div className="w-full grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 justify-start items-end gap-3">
            <div className="flex flex-col justify-between items-start relative gap-1">
              <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
                Especialidad
              </p>
              <FormSelect value="" className="form-control w-full">
                <option value="">-</option>
              </FormSelect>
            </div>
            <div className="flex flex-col justify-between items-start relative gap-1">
              <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
                Cédula de la especialidad
              </p>
              <FormInput
                type={"text"}
                placeholder="Escribe la cédula de la especialidad..."
                min={0}
                value=""
                className="form-control w-full"
                /*onChange={(e) =>
                  setFormData({ ...formData, code: e.target.value })
                }*/
              />
            </div>
            <div className="flex flex-col justify-between items-start relative gap-1">
              <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
                Institución
              </p>
              <FormInput
                type={"text"}
                placeholder="Escribe el nombre de la institución..."
                min={0}
                value=""
                className="form-control w-full"
                /*onChange={(e) =>
                  setFormData({ ...formData, institution_name: e.target.value })
                }*/
              />
            </div>
            <div className="flex flex-col justify-between items-end relative">
              <Button
                className="w-full flex justify-center items-center gap-2 text-white font-base"
                variant="success"
              >
                <Lucide icon="at" />
                <p>Agregar</p>
              </Button>
            </div>
          </div>

          <div className="w-full grid lg:grid-cols-4 grid-cols-1 justify-start items-end gap-3 border-t border-slate-200 pt-5">
            <div className="flex flex-col justify-between items-start relative gap-1">
              <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
                Cédula profesional (C1)
              </p>
              <FormInput
                type={"text"}
                placeholder="Escribe el nombre del consultorio..."
                min={0}
                className="form-control w-full"
                /*onChange={(e) =>
                  setAccount({ ...account, nombre: e.target.value })
                }*/
              />
            </div>
            <div className="flex flex-col justify-between items-start relative gap-1">
              <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
                Institución
              </p>
              <FormInput
                type={"text"}
                placeholder="Escribe el nombre del consultorio..."
                min={0}
                className="form-control w-full"
                /*onChange={(e) =>
                  setAccount({ ...account, nombre: e.target.value })
                }*/
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
