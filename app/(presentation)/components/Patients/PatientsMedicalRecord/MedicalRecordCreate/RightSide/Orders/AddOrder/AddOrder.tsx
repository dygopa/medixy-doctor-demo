import {
  ordersTypeEnToNumberEnum,
  ordersTypeNumberEnEnum,
} from "(presentation)/(enum)/orders/ordersEnum";
import Button from "(presentation)/components/core/BaseComponents/Button";
import { IMedicalProfile } from "domain/core/entities/medicalProfileEntity";
import { IOrderMedical } from "domain/core/entities/orderEntity";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Formulary from "./Formulary/Formulary";
import OrderType from "./OrderType/OrderType";

export interface valuesTypes {
  medicalProfile: IMedicalProfile;
  indication: string;
  specialty: string;
  doctor: string;
  otherDoctor: string;
}

interface IAddOrderProps {
  orders: IOrderMedical[];
  setOrders: Dispatch<SetStateAction<IOrderMedical[]>>;
  orderEdit: IOrderMedical | null;
  setOrderEdit: Dispatch<SetStateAction<IOrderMedical | null>>;
}

export default function AddOrder({
  orders,
  setOrders,
  orderEdit,
  setOrderEdit,
}: IAddOrderProps) {
  const [orderType, setOrderType] = useState<number | null>(null);
  const [values, setValues] = useState({
    medicalProfile: {
      id: 0,
      name: "",
    } as IMedicalProfile,
    indication: "",
    specialty: "",
    doctor: "",
    otherDoctor: "",
  });

  const onAddOrder = () => {
    const orderMedical: IOrderMedical = {
      orderId: orders.length + 1,
      orderType: ordersTypeNumberEnEnum[orderType ?? 1],
      medicalProfile: values.medicalProfile,
      indications: values.indication,
      specialty: orderType === 3 ? values.specialty : null,
      doctorName: orderType === 3 ? values.doctor : null,
      otherDoctorName:
        orderType === 3 && values.otherDoctor.length > 0
          ? values.otherDoctor
          : null,
      createdOn: new Date(),
    };

    setOrders([...orders, orderMedical]);
    setValues({
      ...values,
      medicalProfile: {
        id: 0,
        name: "",
      },
      indication: "",
      specialty: "",
      doctor: "",
      otherDoctor: "",
    });
  };

  const onEditOrder = () => {
    const id = orderEdit?.orderId ? orderEdit.orderId - 1 : 0;

    let newOrdersLists = [...orders];

    let item = { ...newOrdersLists[id] };

    const orderEditMedical: IOrderMedical = {
      orderId: orderEdit?.orderId ?? 0,
      orderType: ordersTypeNumberEnEnum[orderType ?? 1],
      medicalProfile: values.medicalProfile,
      indications: values.indication,
      specialty: orderType === 3 ? values.specialty : null,
      doctorName: orderType === 3 ? values.doctor : null,
      otherDoctorName:
        orderType === 3 && values.otherDoctor.length > 0
          ? values.otherDoctor
          : null,
      createdOn: new Date(),
    };

    item = orderEditMedical;
    newOrdersLists[id] = item;

    setOrders(newOrdersLists);
    setOrderEdit(null);

    setValues({
      ...values,
      medicalProfile: {
        id: 0,
        name: "",
      } as IMedicalProfile,
      indication: "",
      specialty: "",
      doctor: "",
      otherDoctor: "",
    });
  };

  const setValuesByOrderEdit = () => {
    setOrderType(ordersTypeEnToNumberEnum[orderEdit?.orderType ?? ""]);

    setValues({
      ...values,
      medicalProfile:
        orderEdit?.medicalProfile ??
        ({
          id: 0,
          name: "",
        } as IMedicalProfile),
      indication: orderEdit?.indications ?? "",
      specialty: orderEdit?.specialty ?? "",
      doctor: orderEdit?.doctorName ?? "",
      otherDoctor: orderEdit?.otherDoctorName ?? "",
    });
  };

  const isValidForm = (): boolean => {
    if (!orderType) return true;

    if (orderType === 3 && values.specialty.length > 0) {
      return false;
    }

    if (
      (orderType === 1 || orderType === 2) &&
      values.medicalProfile.name.length > 0
    ) {
      return false;
    }

    if (orderType > 3 && values.indication.length > 0) {
      return false;
    }

    return true;
  };

  useEffect(() => {
    if (orderEdit) setValuesByOrderEdit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderEdit]);

  useEffect(() => {
    setValues({
      ...values,
      medicalProfile: {
        id: 0,
        name: "",
      } as IMedicalProfile,
      indication: "",
      specialty: "",
      doctor: "",
      otherDoctor: "",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderType]);

  return (
    <div className="xl:flex">
      <div>
        <OrderType orderType={orderType} setOrderType={setOrderType} />
      </div>

      <div className="xl:w-[1000px] xl:px-8">
        {orderType && (
          <Formulary
            orderType={orderType}
            values={values}
            setValues={setValues}
          />
        )}
      </div>

      <div className="w-full">
        <Button
          type="button"
          variant="primary"
          disabled={isValidForm()}
          onClick={orderEdit ? () => onEditOrder() : () => onAddOrder()}
        >
          {orderEdit ? "Modificar" : "Agregar"}
        </Button>
      </div>
    </div>
  );
}
