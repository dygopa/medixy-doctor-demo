"use client";

import { IUser } from "domain/core/entities/userEntity";
import DoctorsCase from "./DoctorsCase/DoctorsCase";

export default function DashboardIndex() {
  return (
    <div className="container py-8">
      <DoctorsCase />
    </div>
  );
}
