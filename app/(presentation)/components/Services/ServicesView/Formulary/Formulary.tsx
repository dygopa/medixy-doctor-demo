import React, {
  ChangeEvent,
  Fragment,
  useRef,
  Dispatch,
  SetStateAction,
} from "react";
import {
  FormInput,
  FormSelect,
  FormTextarea,
} from "(presentation)/components/core/BaseComponents/Form";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { MdOutlineMedicalServices } from "react-icons/md";
import {
  b64toBlob,
} from "(presentation)/(helper)/files/filesHelper";
import {
  ILocality,
} from "domain/core/entities/localityEntity";
import { NumericFormat } from "react-number-format";

interface IPropsFormulary {
  formData: {
    name: string;
    description: string;
    conditions: string;
    base_price: number;
    status: number;
    location: ILocality;
    locationId: number;
    media: {
        data: string;
        type: string;
    };
  }
  setFormData: Dispatch<SetStateAction<{
    name: string;
    description: string;
    conditions: string;
    base_price: number;
    status: number;
    location: ILocality;
    locationId: number;
    media: {
        data: string;
        type: string;
    };
  }>>
}

export default function Formulary({
  formData,
  setFormData,
}: IPropsFormulary) {
  let avatarRef = useRef<HTMLInputElement>(null);

  const handleClickRef = () => avatarRef.current && avatarRef.current.click();

  const toBase64 = (file: File) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  async function handleChangeMedia(e: ChangeEvent<HTMLInputElement>) {
    let file = e.target.files![0] as File;

    let base64 = await toBase64(file);
    let splittedType = file!.type.split("/");
    var base64result = base64?.toString().split(",")[1];

    let obj = {
      data: base64result ?? "",
      type: `${splittedType[1] ?? ""}`,
    };

    setFormData({ ...formData, media: obj });
  }

  return (
    <>
      <div className="flex mt-5">
        <div className="relative lg:flex justify-center items-start gap-4 w-full">
          <div className="bg-white lg:w-[60%] shadow-xl shadow-slate-100 rounded-md h-fit p-7 lg:mb-0 mb-8">
            <div className="w-full flex flex-wrap justify-between items-center gap-6 relative">
              <div className="w-full border-b mb-2">
                <p className="font-medium text-base text-slate-900 pb-2">
                  Definición del Servicio
                </p>
              </div>
              <div className="text-center relative w-full gap-3">
                {/*<p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
                  Cargar imagen
                  <span className="text-primary font-bold">*</span>
                </p>
                <FormInput
                  type="file"
                  className="form-control lg:w-[70%]"
                  onChange={(e) => handleChangeMedia(e)}
                />*/}
                {formData?.media?.data?.length > 0 ? (
                  <>
                    <div className="flex text-center w-full justify-center">
                      <div className="w-[150px] h-[150px] relative flex justify-center hover:border hover:border-primary rounded-xl">
                        <input
                          accept="image/png, image/jpeg, application/pdf"
                          type="file"
                          ref={avatarRef}
                          className="opacity-0 top-0 h-full z-50 cursor-pointer"
                          onChange={(e) => {
                            handleChangeMedia(e);
                          }}
                        />
                        <Image
                          className="object-cover rounded-xl "
                          src={URL.createObjectURL(
                            b64toBlob(formData.media.data)
                          )}
                          alt=""
                          fill
                        />
                      </div>
                    </div>

                    <p className="text-[13px] text-slate-500 font-medium pt-2">
                      Recomendado (.png, .jpg, .jpeg)
                    </p>
                  </>
                ) : (
                  <>
                    <div className="flex text-center w-full justify-center">
                      <input
                        accept="image/png, image/jpeg, application/pdf"
                        type="file"
                        ref={avatarRef}
                        className="hidden"
                        onChange={(e) => {
                          handleChangeMedia(e);
                        }}
                      />
                      <div
                        onClick={handleClickRef}
                        className={twMerge([
                          "transition w-[10rem] h-[10rem] rounded-xl border flex flex-col justify-center items-center cursor-pointer",
                          "hover:bg-slate-200",
                        ])}
                      >
                        <MdOutlineMedicalServices size={60} />
                      </div>
                    </div>
                    <p className="text-[13px] text-slate-500 font-medium pt-2">
                      Recomendado (.png, .jpg, .jpeg)
                    </p>
                  </>
                )}
              </div>
              <div className="lg:flex justify-between items-start relative w-full gap-3">
                <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
                  Servicio
                  <span className="text-primary font-bold">*</span>
                </p>
                <FormInput
                  type="text"
                  value={formData?.name}
                  placeholder="Nombre del servicio"
                  className="form-control lg:w-[70%]"
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              {/* <div className="lg:flex justify-between items-start relative w-full gap-3">
                <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
                  Categoría
                  <span className="text-primary font-bold">*</span>
                </p>
                <div className="lg:w-[70%]">
                  {userId && (
                    <AutocompleteInputServices
                      defaultValue={formData.service_category_name}
                      onClick={(item) =>
                        setFormData({
                          ...formData,
                          service_category_id: item.id,
                          service_category_name: item.name,
                          service_category_doctor_id: userId
                            ? parseInt(userId, 10)
                            : 0,
                        })
                      }
                      onChange={(item) =>
                        setFormData({
                          ...formData,
                          service_category_id: 0,
                          service_category_name: item,
                          service_category_doctor_id: userId,
                        })
                      }
                      doctorId={userId ? parseInt(userId, 10) : 0}
                      className="form-control w-full"
                    />
                  )}
                </div>
                    </div> */}

              <div className="lg:flex justify-between items-start relative w-full gap-3">
                <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
                  Precio
                  <span className="text-primary font-bold">*</span>
                </p>
                <div className="relative lg:w-[70%]">
                  <div className="w-full">
                    <NumericFormat
                      value={
                        formData.base_price > 0
                          ? formData.base_price
                          : undefined
                      }
                      decimalScale={2}
                      prefix={""}
                      placeholder=""
                      thousandSeparator="."
                      decimalSeparator=","
                      onValueChange={(values, sourceInfo) =>
                        setFormData({
                          ...formData,
                          base_price: values.floatValue
                            ? values.floatValue
                            : 0,
                        })
                      }
                      className={twMerge([
                        "disabled:bg-gray-300 pl-7 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent text-gray-900 w-full",
                        "[&[readonly]]:bg-gray-300 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-800/50 [&[readonly]]:dark:border-transparent",
                        "transition duration-200 ease-in-out w-full bg-gray-100 text-sm border-none shadow-sm rounded-md placeholder:text-gray-400/90 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-gray-700 dark:focus:ring-opacity-50 dark:placeholder:text-gray-500/80",
                      ])}
                    />
                  </div>
                  <div className="absolute left-2 top-1 text-lg text-gray-400">
                    $
                  </div>
                </div>
              </div>
              <div className="lg:flex justify-between items-start relative w-full gap-3">
                <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
                  Descripción
                </p>
                <div className="lg:w-[70%]">
                  <FormTextarea
                    placeholder="Descripcion el servicio"
                    value={formData?.description}
                    className="form-control w-full"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        description: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="lg:flex justify-between items-start relative w-full gap-3">
                <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
                  Condiciones
                </p>
                <FormTextarea
                  placeholder="Condiciones del servicio"
                  value={formData?.conditions}
                  className="form-control lg:w-[70%]"
                  onChange={(e) =>
                    setFormData({ ...formData, conditions: e.target.value })
                  }
                />
              </div>
              <div className="lg:flex justify-between items-start relative w-full gap-3">
                <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
                  Estado
                </p>
                <div className="lg:w-[70%]">
                  <FormSelect
                    value={formData?.status}
                    className="form-control"
                    onChange={(e) =>
                      setFormData({ ...formData, status: +e.target.value })
                    }
                  >
                    <option value={1}>Activo</option>
                    <option value={2}>Borrador</option>
                  </FormSelect>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
