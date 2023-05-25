"use client";

import { IUser } from "domain/core/entities/userEntity";
import React, { useState, useEffect, useContext, useMemo } from "react";
import {
  AuthContext,
  IAuthContext,
} from "(presentation)/(layouts)/AppLayout/context/AuthContext";
import GridLinks from "./GridLinks/GridLinks";

export default function ConfigurationIndex() {
  return (
    <div className="py-5 relative">
        <GridLinks/>
    </div>
  );
}
