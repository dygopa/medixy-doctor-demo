import Button from "(presentation)/components/core/BaseComponents/Button";
import {
  FormInput,
  FormSelect,
} from "(presentation)/components/core/BaseComponents/Form";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { FiBriefcase, FiCheck, FiHelpCircle, FiHome } from "react-icons/fi";
import { twMerge } from "tailwind-merge";
import moment from "moment";
import { useSearchParams, useRouter } from "next/navigation";
import {
  IScheduleContext,
  ScheduleContext,
} from "(presentation)/components/Schedule/context/ScheduleContext";
import SpecialSearch, {
  SpecialSelect,
} from "(presentation)/components/core/SpecialSearch/SpecialSearch";
import { IService } from "domain/core/entities/serviceEntity";
import { ILocality } from "domain/core/entities/localityEntity";
import AlertComponent from "../../BaseComponents/Alert";
import Tooltip from "../../BaseComponents/Tooltip/Tooltip";
import { IUser } from "domain/core/entities/userEntity";

function CreateAgenda({
  user,
  cancelFuntion,
  customRef,
}: {
  user: IUser;
  cancelFuntion: Function;
  customRef: React.LegacyRef<HTMLDivElement>;
}) {
  const { state, actions, dispatch } =
    useContext<IScheduleContext>(ScheduleContext);
  const {
    changeTypePopup,
    changeStatusPopup,
    getServicesByLocality,
    getLocalitiesWithServices,
    activeLocality,
    createWindowAttention,
    getAttentionWindows,
    getAttentionWindowsByLocation,
  } = actions;
  const { data: localities, successful: loadedLocalities } =
    state.getLocalitiesWithServices;
  const { data: services, successful: loadedServices } =
    state.getServicesByLocality;
  const { data: attentionWindows } = state.getAttentionWindowsByLocality;
  const { loading, successful, error } = state.createWindowAttention;
  const { data: activeService, successful: changedActiveService } =
    state.activeService;

  const { data: locality } = state.activeLocality;
  const { data: statusPopup } = state.statusPopup;

  const params = useSearchParams();
  const router = useRouter();

  let type_agenda = [
    {
      title: "Por espacio",
      value: 2,
    },
  ];

  const [loadedLists, setLoadedLists] = useState<boolean>(false);
  const [generatedHours, setGeneratedHours] = useState<boolean>(false);

  const [listOfLocalities, setListOfLocalities] = useState<Array<any>>([]);
  const [listOfServices, setListOfServices] = useState<Array<any>>([]);
  const [daysRepeatedList, setDaysRepeatedList] = useState<Array<any>>([]);
  const [listOfStartHours, setListOfStartHours] = useState<Array<any>>([]);
  const [listOfHours, setListOfHours] = useState<Array<any>>([]);
  const [daysInWeek, setDaysInWeek] = useState([
    {
      title: "L",
      value: 1,
      isBlock: false,
    },
    {
      title: "M",
      value: 2,
      isBlock: false,
    },
    {
      title: "X",
      value: 4,
      isBlock: false,
    },
    {
      title: "J",
      value: 8,
      isBlock: false,
    },
    {
      title: "V",
      value: 16,
      isBlock: false,
    },
    {
      title: "S",
      value: 32,
      isBlock: false,
    },
    {
      title: "D",
      value: 64,
      isBlock: false,
    },
  ]);

  let type_of_ends: any[] = [
    {
      value: 1,
      title: "Nunca",
      description: "La agenda no tiene fecha de culminación",
    },
    {
      value: 2,
      title: "El",
      description: "31 de Abril 2023",
    },
  ];

  const [selectedService, setSelectedService] = useState({
    id: 0,
    title: "",
    description: "",
    type: "SERVICE",
  });

  const [selectedLocality, setSelectedLocality] = useState({
    id: 0,
    title: "",
    description: "",
    type: "LOCALITY",
  });

  let [formData, setFormData] = useState({
    typeEnd: 1,
    daysRepeated: daysRepeatedList,
    type: 2,
    serviceId: 0,
    localityId: 0,
    availableSpots: 0,
    startDate: moment().format("YYYY-MM-DD"),
    until: moment().add(1, "month").format("YYYY-MM-DD"),
    spanTime: 0,
    fromHour: "600",
    toHour: "",
  });

  function handleAddInDay(day: any) {
    if (day.isBlock) return;

    let list = [...daysRepeatedList];
    let alreadyExists =
      list.filter((elem) => elem["value"] === day["value"]).length > 0;

    if (alreadyExists) {
      list = list.filter((elem) => elem["value"] !== day["value"]);
    } else {
      list.push(day);
    }
    setDaysRepeatedList(list);
  }

  const RepitedDayComponent = ({
    elem,
    index,
  }: {
    elem: any;
    index: number;
  }) => {
    let isInList = daysRepeatedList.find((v) => v["value"] === elem["value"]);
    return (
      <div
        className={twMerge([
          "cursor-pointer w-8 h-8 flex flex-col justify-center items-center text-center border font-light text-sm rounded-full relative group",
          elem.isBlock
            ? "bg-gray-300 text-white border-gray-300"
            : isInList
            ? "bg-green-500 text-white border-green-500"
            : "bg-transparent text-secondary border-secondary",
        ])}
        onClick={
          !elem.isBlock
            ? () => {
                handleAddInDay(elem);
              }
            : () => {}
        }
        key={index}
      >
        <p> {elem["title"]}</p>
        {elem.isBlock && (
          <Tooltip>
            Ya tienes una ventana de atención creada para este día y dentro de
            las horas que seleccionaste
          </Tooltip>
        )}
      </div>
    );
  };

  function generateHours() {
    let list = [];

    let endOfDay = moment().utc().add(1, "day").startOf("day");
    let start = moment().utc().startOf("day");

    start = start.add(15, "minutes");
    list.push({
      value: parseInt(start.format("HH:mm").split(":").join("")),
      label: start.format("hh:mm a"),
    });

    do {
      start = start.add(15, "minutes");
      list.push({
        value: parseInt(start.format("HH:mm").split(":").join("")),
        label: start.format("hh:mm a"),
      });
    } while (start.isBefore(endOfDay));

    setListOfStartHours(list);
    setGeneratedHours(true);
  }

  function formatHoursFromSpan() {
    let list = [];

    let fromMinutes = listOfStartHours.find(
      (elem: any) => elem["value"] === parseInt(formData.fromHour)
    );
    let minutes = fromMinutes["label"].split(":")[1].split(" ")[0];

    let endOfDay = moment().utc().add(1, "day").startOf("day");
    let start = moment().utc().startOf("day");

    start = start.add(formData.spanTime + parseInt(minutes), "minutes");
    list.push({
      value: parseInt(start.format("HH:mm").split(":").join("")),
      label: start.format("hh:mm a"),
    });

    do {
      start = start.add(formData.spanTime, "minutes");
      list.push({
        value: parseInt(start.format("HH:mm").split(":").join("")),
        label: start.format("hh:mm a"),
      });
    } while (start.isBefore(endOfDay));

    setListOfHours(list);
  }

  function handleFormatList() {
    let list_localities = localities.map((elem: any) => ({
      id: elem.id,
      title: elem.name,
      description: elem["postal_code"] ? elem["postal_code"] : "Sin dirección",
      type: "LOCALITY",
    }));
    setListOfLocalities(list_localities);

    setLoadedLists(true);
  }

  //function getDataFromPredifined() {
  //  let findedLocality = listOfLocalities.find(
  //    (elem: ILocality) => elem.id === parseInt(params.get("locality")!)
  //  );
  //  if (findedLocality !== undefined) {
  //    setSelectedLocality({
  //      id: findedLocality!["id"],
  //      title: findedLocality!["title"],
  //      description: findedLocality!["address"],
  //      type: "LOCALITY",
  //    });
  //  }
  //}

  function blockDaysByHours(attentionWindowsList: any) {
    const daysBlocked: string[] = [];

    if (attentionWindowsList?.length > 0) {
      const days: any = {
        0: "D",
        1: "L",
        2: "M",
        3: "X",
        4: "J",
        5: "V",
        6: "S",
      };

      attentionWindowsList.forEach((attentionWindow: any) => {
        const day = new Date(attentionWindow.fechaInicio).getDay();

        if (day >= 0) {
          const dayTitle = days[day];

          if (daysBlocked.indexOf(dayTitle) < 0) {
            daysBlocked.push(dayTitle);
          }
        }
      });
    }

    if (daysBlocked.length > 0) {
      let daysInWeekList: any = daysInWeek;

      daysBlocked.forEach((dayBlocked) => {
        let items = [...daysInWeekList];
        let index = items.findIndex((elem) => elem.title === dayBlocked);

        if (index >= 0) {
          let item = { ...items[index] };

          item.isBlock = true;

          items[index] = item;

          daysInWeekList = items;
        }
      });

      setDaysInWeek(daysInWeekList);
      return;
    }

    setDaysInWeek([
      {
        title: "L",
        value: 1,
        isBlock: false,
      },
      {
        title: "M",
        value: 2,
        isBlock: false,
      },
      {
        title: "X",
        value: 4,
        isBlock: false,
      },
      {
        title: "J",
        value: 8,
        isBlock: false,
      },
      {
        title: "V",
        value: 16,
        isBlock: false,
      },
      {
        title: "S",
        value: 32,
        isBlock: false,
      },
      {
        title: "D",
        value: 64,
        isBlock: false,
      },
    ]);
  }

  function onHandleHours(name: string, value: string, startDate: Date) {
    let fromHour =
      name === "fromHour"
        ? parseInt(value, 10)
        : formData.fromHour.length > 0
        ? parseInt(formData.fromHour)
        : 0;
    let toHour =
      name === "toHour"
        ? parseInt(value, 10)
        : formData.toHour.length > 0
        ? parseInt(formData.toHour)
        : 0;

    if (name === "fromHour") setFormData({ ...formData, fromHour: value });

    if (name === "toHour") setFormData({ ...formData, toHour: value });

    if (attentionWindows && attentionWindows.length > 0) {
      let attentionWindowsFromHours = attentionWindows.filter(
        (elem: any) => fromHour >= elem.horaInicio && fromHour < elem.horaFin
      );

      if (attentionWindowsFromHours.length > 0) {
        attentionWindowsFromHours = attentionWindows.filter((elem: any) =>
          moment(elem.fechaInicio).isAfter(startDate)
        );

        if (attentionWindowsFromHours.length > 0) {
          blockDaysByHours(attentionWindowsFromHours);
          return;
        }
      }

      const attentionWindowsToHours = attentionWindows.filter(
        (elem: any) => fromHour < elem.horaInicio && toHour > elem.horaInicio
      );
      blockDaysByHours(attentionWindowsToHours);
    }
  }

  useMemo(() => {
    if (selectedLocality["title"] !== "") {
      let id: number = selectedLocality.id;
      setFormData({
        ...formData,
        localityId: id,
        typeEnd: 1,
        daysRepeated: daysRepeatedList,
        type: 2,
        serviceId: 0,
        availableSpots: 0,
        startDate: moment().format("YYYY-MM-DD"),
        until: moment().add(1, "month").format("YYYY-MM-DD"),
        spanTime: 0,
        fromHour: "600",
        toHour: "",
      });
      setDaysInWeek([
        {
          title: "L",
          value: 1,
          isBlock: false,
        },
        {
          title: "M",
          value: 2,
          isBlock: false,
        },
        {
          title: "X",
          value: 4,
          isBlock: false,
        },
        {
          title: "J",
          value: 8,
          isBlock: false,
        },
        {
          title: "V",
          value: 16,
          isBlock: false,
        },
        {
          title: "S",
          value: 32,
          isBlock: false,
        },
        {
          title: "D",
          value: 64,
          isBlock: false,
        },
      ]);
      console.log(selectedLocality["id"]);
      getAttentionWindowsByLocation(id)(dispatch);
    }
  }, [selectedLocality]);

  useEffect(() => {
    if (locality) {
      setSelectedLocality({
        id: locality.id,
        title: locality.title,
        description: locality.description,
        type: "LOCALITY",
      });
    }
  }, [locality]);

  useMemo(() => {
    if (selectedService["title"] !== "") {
      let id: number = selectedService.id;
      setFormData({ ...formData, serviceId: id });
      console.log(selectedService["id"]);
    }
  }, [selectedService]);

  useMemo(() => {
    if (loadedLocalities) handleFormatList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadedLocalities, localities]);

  useEffect(() => {
    if (formData.fromHour.length === 0)
      setDaysInWeek([
        {
          title: "L",
          value: 1,
          isBlock: false,
        },
        {
          title: "M",
          value: 2,
          isBlock: false,
        },
        {
          title: "X",
          value: 4,
          isBlock: false,
        },
        {
          title: "J",
          value: 8,
          isBlock: false,
        },
        {
          title: "V",
          value: 16,
          isBlock: false,
        },
        {
          title: "S",
          value: 32,
          isBlock: false,
        },
        {
          title: "D",
          value: 64,
          isBlock: false,
        },
      ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successful]);

  useMemo(() => {
    if (loadedServices) {
      let list_services = services.map((elem: IService) => ({
        id: elem.id,
        title: elem.name,
        description: elem.description,
        type: "SERVICE",
      }));
      setListOfServices(list_services);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadedServices]);

  useMemo(() => {
    if (successful) {
      setDaysInWeek(
        daysInWeek.map((elem: any) => ({
          ...elem,
          isBlock: false,
        }))
      );

      activeLocality(selectedLocality)(dispatch);
      setFormData({
        typeEnd: 1,
        daysRepeated: daysRepeatedList,
        type: 2,
        serviceId: 0,
        localityId: 0,
        availableSpots: 0,
        startDate: moment().format("YYYY-MM-DD"),
        until: moment().add(1, "month").format("YYYY-MM-DD"),
        spanTime: 0,
        fromHour: "600",
        toHour: "",
      });
      setDaysRepeatedList([]);
      setListOfHours([]);
      getAttentionWindows(formData.localityId, "LOCALITY")(dispatch);
      setTimeout(() => {
        changeStatusPopup(false)(dispatch);
      }, 2000);
    }
  }, [successful]);

  useMemo(() => {
    if (!statusPopup) {
      // router.push(`/schedule/configuration`);
      setDaysInWeek(
        daysInWeek.map((elem: any) => ({
          ...elem,
          isBlock: false,
        }))
      );
      setSelectedLocality({
        id: locality.id,
        title: locality.title,
        description: locality["postal_code"]
          ? locality["postal_code"]
          : "Sin dirección",
        type: "LOCALITY",
      });
      setFormData({
        typeEnd: 1,
        daysRepeated: daysRepeatedList,
        type: 2,
        serviceId: 0,
        localityId: locality["id"],
        availableSpots: 0,
        startDate: moment().format("YYYY-MM-DD"),
        until: moment().add(1, "month").format("YYYY-MM-DD"),
        spanTime: 0,
        fromHour: "600",
        toHour: "",
      });
      setDaysRepeatedList([]);
      setListOfHours([]);
    }
  }, [statusPopup]);

  useMemo(() => {
    if (formData.spanTime > 0 && formData.fromHour !== "") {
      formatHoursFromSpan();
    }
  }, [formData.spanTime, formData.fromHour]);

  useEffect(() => {
    if (!generatedHours) generateHours();
  }, [generatedHours]);

  useMemo(() => {
    if (user) {
      getLocalitiesWithServices(user.userId)(dispatch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  /* useMemo(() => {
    if (selectedLocality.id !== 0){
      getServicesByLocality(user.userId, selectedLocality["id"])(dispatch)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLocality]); */

  //useMemo(() => {
  //  if (params.get("locality") !== null && loadedLocalities) {
  //    setFormData({
  //      ...formData,
  //      localityId: parseInt(params.get("locality")!),
  //    });
  //    getDataFromPredifined();
  //  }
  //}, [loadedLocalities, params]);

  return (
    <div
      ref={customRef}
      className="w-full md:w-[60%] lg:w-[40%] h-screen  md:min-h-[60vh] md:max-h-[90vh] lg:min-h-[60vh] lg:max-h-[90vh] overflow-y-auto flex flex-col justify-between items-start bg-white lg:rounded-md p-6 pb-0 gap-8"
    >
      <div className="w-full flex justify-between items-center">
        <p className="font-bold text-2xl text-slate-900">
          Nueva ventana de atención
        </p>
        <div
          onClick={() => {
            changeStatusPopup(true)(dispatch);
            changeTypePopup(3)(dispatch);
          }}
          className="cursor-pointer text-primary rounded-md w-fit h-fit flex justify-end items-center text-sm font-normal gap-2"
        >
          <p className="text-end">Necesito ayuda</p>
          <FiHelpCircle />
        </div>
      </div>
      <div className="w-full flex flex-col justify-center items-center gap-5">
        <div className="w-full flex flex-col justify-center items-start gap-2">
          <p className="font-normal text-sm text-slate-600">
            En que consultorio
          </p>
          <SpecialSelect
            emptySelectedValue={{
              title: "Consultorio",
              description: "Selecciona un consultorio de la lista",
            }}
            customClick={setSelectedLocality}
            selectedItem={selectedLocality}
            list={listOfLocalities}
          />
          {/* <SpecialSearch
            customClick={setSelectedLocality}
            customClickEmpty={() => {}}
            list={listOfLocalities}
            placeholder={"Buscar..."}
            selectedItem={selectedLocality}
          /> */}
        </div>
        {/* <div className="w-full flex flex-col justify-center items-start gap-2">
          <p className='font-normal text-sm text-slate-600'>Para que servicio</p>
          <SpecialSearch
            customClick={setSelectedService}
            customClickEmpty={()=>{}}
            list={listOfServices}
            placeholder={"Buscar..."}
            selectedItem={selectedService}
          />
          {selectedService["title"] !== "" && <div className={twMerge([
            "transition w-full h-[10vh] flex justify-between items-center gap-3 bg-white"
          ])}>
            <div className='w-12 h-12 overflow-hidden rounded-lg bg-primary/20 text-primary text-lg flex flex-col justify-center items-center'>
              <FiBriefcase/>
            </div>
            <div className="w-[90%] h-full flex flex-col justify-center items-start">
              <p className='font-semibold text-gray-950 text-[0.9rem]'>Servicio - {selectedService["title"]}</p>
              <p className='font-light text-gray-600 text-sm'>{selectedService["description"]}</p>
            </div>
          </div>}
        </div> */}
        <div className="w-full flex flex-col justify-center items-start gap-2">
          <p className="font-normal text-sm text-slate-600">Tipo</p>
          <div className="w-full flex justify-start items-center gap-3">
            {type_agenda.map((elem, i) => (
              <div
                className={twMerge([
                  "cursor-pointer w-fit border px-5 py-2 font-light text-sm rounded-md flex justify-center items-center gap-2",
                  formData["type"] === elem["value"]
                    ? "bg-green-500 text-white border-green-500"
                    : "bg-transparent text-secondary border-secondary",
                ])}
                onClick={() => {
                  setFormData({ ...formData, type: elem["value"] });
                }}
                key={i}
              >
                {elem["title"]}
                {formData["type"] === elem["value"] && <FiCheck />}
              </div>
            ))}
          </div>
        </div>
        {formData["type"] === 1 ? (
          <div className="w-full flex justify-between items-center gap-2">
            <div className="w-3/5">
              <p className="font-normal text-sm text-slate-600">
                Cupos disponibles
              </p>
            </div>
            <div className="w-1/5">
              <FormInput
                type="number"
                value={formData.availableSpots}
                className="form-control"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    availableSpots: +e.target.value,
                  })
                }
              />
            </div>
            <div className="w-1/5">
              <p className="text-sm font-light text-slate-500">Disponibles</p>
            </div>
          </div>
        ) : (
          <div className="w-full flex justify-between items-center gap-2">
            <div className="w-3/5">
              <p className="font-normal text-sm text-slate-600">
                Tiempo promedio de atención
              </p>
            </div>
            <div className="w-1/5">
              <FormSelect
                value={formData.spanTime}
                className="form-control"
                onChange={(e) =>
                  setFormData({ ...formData, spanTime: +e.target.value })
                }
              >
                <option>-</option>
                <option value={15}>15</option>
                <option value={30}>30</option>
                <option value={45}>45</option>
                <option value={60}>60</option>
                <option value={90}>90</option>
              </FormSelect>
            </div>
            <div className="w-1/5">
              <p className="text-sm font-light text-slate-500">Minutos</p>
            </div>
          </div>
        )}
        <div className="w-full flex gap-3 justify-start items-center">
          <div className="w-3/5 flex flex-col justify-center items-start gap-2">
            <p className="font-normal text-sm text-slate-600">Apartir de</p>
            <FormInput
              type={"date"}
              name="fromDate"
              value={formData.startDate}
              min={moment().format("YYYY-MM-DD")}
              className="form-control"
              onChange={(e) => {
                setFormData({
                  ...formData,
                  startDate: e.target.value,
                  until: moment().add(1, "month").format("YYYY-MM-DD"),
                });
                onHandleHours(
                  e.target.name,
                  e.target.value,
                  moment(e.target.value, "YYYY-MM-DD").toDate()
                );
              }}
            />
          </div>
          <div className="w-1/5 flex flex-col justify-center items-start gap-2">
            <p className="font-normal text-sm text-slate-600">Desde</p>
            <FormSelect
              value={formData.fromHour}
              name="fromHour"
              className="form-control"
              onChange={(e) => {
                setDaysRepeatedList([]);
                onHandleHours(
                  e.target.name,
                  e.target.value,
                  moment(formData.startDate, "YYYY-MM-DD").toDate()
                );
              }}
            >
              <option value={0}>-</option>
              {listOfStartHours.map((elem: any) => (
                <option value={elem["value"]}>{elem["label"]}</option>
              ))}
            </FormSelect>
          </div>
          <div className="w-1/5 flex flex-col justify-center items-start gap-2">
            <p className="font-normal text-sm text-slate-600">Hasta</p>
            <FormSelect
              value={formData.toHour}
              name="toHour"
              className="form-control"
              onChange={(e) => {
                setDaysRepeatedList([]);
                onHandleHours(
                  e.target.name,
                  e.target.value,
                  moment(formData.startDate, "YYYY-MM-DD").toDate()
                );
              }}
            >
              <option value={0}>-</option>
              {listOfHours
                .filter((elem: any) => elem["value"] > formData.fromHour)
                .map((elem: any) => (
                  <option value={elem["value"]}>{elem["label"]}</option>
                ))}
            </FormSelect>
          </div>
        </div>
        {moment(formData.startDate).subtract(-1, "day").isBefore(moment()) && (
          <div className="w-full py-1 text-left ">
            <p className="text-red-600 text-sm font-medium">
              La fecha de arranque no puede ser menor a la fecha de hoy
            </p>
          </div>
        )}
        <div className="w-full flex flex-col justify-center items-start gap-2">
          <p className="font-normal text-sm text-slate-600">Se repite los</p>
          <div className="w-full flex justify-between items-center gap-3">
            {daysInWeek.map((elem, i) => (
              <RepitedDayComponent key={i} elem={elem} index={i} />
            ))}
          </div>
        </div>
        <div className="w-full flex flex-col justify-center items-start gap-2">
          <p className="font-normal text-sm text-slate-600">Termina</p>
          <div className="w-full flex justify-between items-center gap-3">
            {type_of_ends.map((elem, i) => {
              let isSelected = formData["typeEnd"] === elem["value"];
              return (
                <div
                  onClick={() => {
                    setFormData({ ...formData, typeEnd: elem["value"] });
                  }}
                  className={twMerge([
                    "transition cursor-pointer w-1/2 h-[10vh] p-3 flex flex-col justify-center items-start border rounded-md relative",
                    isSelected ? "border-green-500" : "border-slate-300",
                  ])}
                  key={i}
                >
                  {isSelected && (
                    <span className="w-5 h-5 bg-green-500 rounded-full flex justify-center items-center text-white text-xs absolute top-2 right-2">
                      <FiCheck />
                    </span>
                  )}
                  <p className="font-medium text-sm text-slate-900">
                    {elem["title"]}
                  </p>
                  {elem["value"] === 2 ? (
                    <FormInput
                      type={"date"}
                      className="form-control"
                      defaultValue={
                        formData["typeEnd"] === 2 ? formData.until : ""
                      }
                      min={moment(formData.startDate)
                        .add(1, "days")
                        .format("YYYY-MM-DD")}
                      onChange={(e) => {
                        console.log(e.target.value);
                        setFormData({ ...formData, until: e.target.value });
                      }}
                    />
                  ) : (
                    <p className="font-medium text-xs text-slate-500">
                      {elem["description"]}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col justify-center items-center gap-4 sticky bottom-0 py-3 bg-white">
        <Button
          disabled={
            loading ||
            moment(formData.startDate).subtract(-1, "day").isBefore(moment()) ||
            daysRepeatedList.length === 0 ||
            formData.localityId === 0 ||
            formData.startDate === "" ||
            formData.fromHour === "" ||
            formData.toHour === ""
          }
          onClick={() => {
            createWindowAttention({
              ...formData,
              daysRepeated: daysRepeatedList,
            })(dispatch);
          }}
          variant="primary"
          type="button"
          className="w-full"
        >
          {loading ? "Creando..." : "Guardar"}
        </Button>
        <p
          onClick={() => {
            cancelFuntion();
          }}
          className="cursor-pointer font-normal text-sm text-primary text-center"
        >
          Cancelar
        </p>
      </div>
    </div>
  );
}

export default CreateAgenda;
