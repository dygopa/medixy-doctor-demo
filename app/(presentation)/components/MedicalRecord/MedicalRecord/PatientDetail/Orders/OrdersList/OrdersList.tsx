import {
  medicalRecordTypeOrderEnum,
  MedicalRecordTypesOrdersEnum,
} from "(presentation)/(enum)/medicalRecord/medicalRecordEnums";
import Button from "(presentation)/components/core/BaseComponents/Button";
import { IMedicalRecord } from "domain/core/entities/medicalRecordEntity";
import React, { useContext, useEffect, useState } from "react";
import {
  IMedicalRecordContext,
  MedicalRecordContext,
} from "../../../context/MedicalRecordContext";
import Order from "./Order/Order";

export default function OrdersList() {
  const { state, actions, dispatch } =
    useContext<IMedicalRecordContext>(MedicalRecordContext);
  const { getOrders } = actions;
  const { data: subject } = state.subject;
  const { data, loading, error, successful } = state.orders;

  const [orders, setOrders] = useState<IMedicalRecord[]>([]);

  const setOrdersMap = () => {
    const ordersList: IMedicalRecord[] = [];

    if (data.data && data.data.length > 0) {
      data.data.forEach((medicalRecord: IMedicalRecord) => {
        const index = ordersList.findIndex(
          (medicalRecordFind) =>
            medicalRecordFind.medicalRecordTypeId ===
            medicalRecord.medicalRecordTypeId
        );

        if (index < 0) ordersList.push(medicalRecord);
      });
    }

    setOrders(ordersList);
  };

  const onGetOrdersDispatch = () => {
    if (subject?.subjectId) {
      getOrders({
        subjectId: subject.subjectId,
        limit: 6,
      })(dispatch);
    }
  };

  const getTextByOrderType = (medicalRecord: IMedicalRecord): string => {
    if (
      medicalRecord.medicalRecordType.name ===
      MedicalRecordTypesOrdersEnum.ORDER_LABORATORY
    ) {
      return medicalRecord.medicalRecordValues[0].value.length === 0
        ? medicalRecord.medicalRecordValues[1].value
        : medicalRecord.medicalRecordValues[0].value;
    }

    if (
      medicalRecord.medicalRecordType.name ===
      MedicalRecordTypesOrdersEnum.ORDER_DIAGNOSIS
    ) {
      return medicalRecord.medicalRecordValues[0].value.length === 0
        ? medicalRecord.medicalRecordValues[1].value
        : medicalRecord.medicalRecordValues[0].value;
    }

    if (
      medicalRecord.medicalRecordType.name ===
      MedicalRecordTypesOrdersEnum.ORDER_HOSPITALIZATION
    ) {
      return medicalRecordTypeOrderEnum[medicalRecord.medicalRecordType.name];
    }

    if (
      medicalRecord.medicalRecordType.name ===
      MedicalRecordTypesOrdersEnum.ORDER_MEDICAL_PROOF
    ) {
      return medicalRecordTypeOrderEnum[medicalRecord.medicalRecordType.name];
    }

    if (
      medicalRecord.medicalRecordType.name ===
      MedicalRecordTypesOrdersEnum.ORDER_MEDICAL_CERTIFICATE
    ) {
      return medicalRecordTypeOrderEnum[medicalRecord.medicalRecordType.name];
    }

    if (
      medicalRecord.medicalRecordType.name ===
        MedicalRecordTypesOrdersEnum.ORDER_SPECIALTY &&
      medicalRecord.medicalRecordValues.length >= 1
    ) {
      return `${medicalRecord.medicalRecordValues[0].value} ${medicalRecord.medicalRecordValues[1].value}`;
    }

    if (
      medicalRecord.medicalRecordType.name ===
      MedicalRecordTypesOrdersEnum.ORDER_OPENING
    ) {
      return medicalRecord.medicalRecordValues[0].value;
    }

    return "";
  };

  useEffect(() => {
    onGetOrdersDispatch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (successful) setOrdersMap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successful]);

  if (loading) {
    return (
      <div className="w-full flex flex-col justify-center items-center mt-8">
        <p className="font-light text-slate-500 text-base">
          Cargando las ordenes...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full flex flex-col justify-center items-center mt-8">
        <p className="font-bold text-slate-900 text-lg">
          Vaya, algo no ha salido como se esperaba
        </p>
        <p className="font-light text-slate-500 text-base mb-4">
          Lo sentimos, algo no ha salido bien. Vuelve a intentarlo
        </p>
        <Button variant="primary" onClick={() => onGetOrdersDispatch()}>
          Volver a intentar
        </Button>
      </div>
    );
  }

  if (successful && orders.length === 0) {
    return (
      <div className="w-full flex flex-col justify-center items-center mt-8">
        <p className="font-light text-slate-500 text-base">
          El paciente no posee ordenes.
        </p>
      </div>
    );
  }

  if (!data.data) return <div />;

  return (
    <div className="mt-4">
      {orders.map((medicalRecord: IMedicalRecord) => (
        <React.Fragment key={medicalRecord.id}>
          {medicalRecord.medicalRecordValues.length > 0 && (
            <div className="mb-4">
              <Order
                text={getTextByOrderType(medicalRecord)}
                date={medicalRecord.medicalConsulty.consultationDate}
              />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
