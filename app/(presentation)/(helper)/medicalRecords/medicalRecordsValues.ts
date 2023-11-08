
export const medicalConsultyInitialValues = {
  appointmentId: "",
  currentConsultation: {
    consultationDate: `${new Date().getFullYear()}-${
      new Date().getMonth() + 1 < 10
        ? `0${new Date().getMonth() + 1}`
        : new Date().getMonth()
    }-${
      new Date().getDate() < 10
        ? `0${new Date().getDate()}`
        : new Date().getDate()
    }`,
    referredBy: "",
    consultationReason: "",
    sufferingDate: "",
    diagnose: [],
    observations: "",
  },
  images: [],
  physical: {
    abnormalAppearance: {
      isChecked: false,
      value: "",
    },
    disnea: {
      isChecked: false,
      value: "",
    },
    deformity: {
      isChecked: false,
      value: "",
    },
    amputation: {
      isChecked: false,
      value: "",
    },
    paralysis: {
      isChecked: false,
      value: "",
    },
    abnormalMovements: {
      isChecked: false,
      value: "",
    },
    normalGait: {
      isChecked: false,
      value: "",
    },
    mentalDisorder: {
      isChecked: false,
      value: "",
    },
    abnormality: {
      isChecked: false,
      value: "",
      values: {
        anatomicalStateEyes: {
          isChecked: false,
          value: "",
        },
        eyeVision: {
          isChecked: false,
          value: "",
        },
        hearingEars: {
          isChecked: false,
          value: "",
        },
        buccalPharynx: {
          isChecked: false,
          value: "",
        },
        neck: {
          isChecked: false,
          value: "",
        },
        chest: {
          isChecked: false,
          value: "",
        },
        spine: {
          isChecked: false,
          value: "",
        },
        abdomen: {
          isChecked: false,
          value: "",
        },
        extremities: {
          isChecked: false,
          value: "",
        },
      },
    },
    smokingPhysical: {
      isChecked: false,
      value: "",
    },
  },
  vitalSigns: {
    size: "",
    weight: "",
    temperature: "",
    respiratoryFrequency: "",
    oximetry: "",
    muscleMass: "",
    glicemy: "",
  },
  records: {
    allergiesPathological: {
      isChecked: false,
      values: [],
    },
    surgicalInterventions: {
      isChecked: false,
      values: [],
    },
    takeMedication: {
      isChecked: false,
      values: [],
    },
    transfusions: {
      isChecked: false,
      value: "",
    },
    anemia: {
      isChecked: false,
      value: "",
    },
    arthritis: {
      isChecked: false,
      value: "",
    },
    asma: {
      isChecked: false,
      value: "",
    },
    cancer: {
      isChecked: false,
      value: "",
    },
    bloodClots: {
      isChecked: false,
      value: "",
    },
    colitis: {
      isChecked: false,
      value: "",
    },
    bloodTypeNonPathological: {
      isChecked: false,
      values: [],
    },
    smokingNonPathological: {
      isChecked: false,
      value: "",
    },
    alcoholicBeveragesNonPathological: {
      isChecked: false,
      value: "",
    },
    drugsNonPathological: {
      isChecked: false,
      value: "",
    },
    exerciseNonPathological: {
      isChecked: false,
      value: "",
    },
    covidNonPathological: {
      isChecked: false,
      value: "",
    },
    diabetesFamily: {
      isChecked: false,
      values: [],
    },
    cancerFamily: {
      isChecked: false,
      values: [],
    },
    hypertensionFamily: {
      isChecked: false,
      values: [],
    },
    sidaFamily: {
      isChecked: false,
      values: [],
    },
    otherFamily: {
      isChecked: false,
      values: [],
    },
  },
  orders: [],
  recipes: [],
  isValid: false,
};

export type medicalRecordValuesTypes = {
    allergiesPathological: {
      isChecked: boolean;
      values: string[];
    };
    surgicalInterventions: {
      isChecked: boolean;
      values: string[];
    };
    takeMedication: {
      isChecked: boolean;
      values: string[];
    };
    transfusions: {
      isChecked: boolean;
      value: string;
    };
    anemia: {
      isChecked: boolean;
      value: string;
    };
    arthritis: {
      isChecked: boolean;
      value: string;
    };
    asma: {
      isChecked: boolean;
      value: string;
    };
    cancer: {
      isChecked: boolean;
      value: string;
    };
    bloodClots: {
      isChecked: boolean;
      value: string;
    };
    colitis: {
      isChecked: boolean;
      value: string;
    };
    bloodTypeNonPathological: {
      isChecked: boolean;
      values: string[];
    };
    smokingNonPathological: {
      isChecked: boolean;
      value: string;
    };
    alcoholicBeveragesNonPathological: {
      isChecked: boolean;
      value: string;
    };
    drugsNonPathological: {
      isChecked: boolean;
      value: string;
    };
    exerciseNonPathological: {
      isChecked: boolean;
      value: string;
    };
    covidNonPathological: {
      isChecked: boolean;
      value: string;
    };
    diabetesFamily: {
      isChecked: boolean;
      values: string[];
    };
    cancerFamily: {
      isChecked: boolean;
      values: string[];
    };
    hypertensionFamily: {
      isChecked: boolean;
      values: string[];
    };
    sidaFamily: {
      isChecked: boolean;
      values: string[];
    };
    otherFamily: {
      isChecked: boolean;
      values: string[];
    };
  };

export const medicalRecordsValues: medicalRecordValuesTypes = {
    allergiesPathological: {
      isChecked: false,
      values: [],
    },
    surgicalInterventions: {
      isChecked: false,
      values: [],
    },
    takeMedication: {
      isChecked: false,
      values: [],
    },
    transfusions: {
      isChecked: false,
      value: "",
    },
    anemia: {
      isChecked: false,
      value: "",
    },
    arthritis: {
      isChecked: false,
      value: "",
    },
    asma: {
      isChecked: false,
      value: "",
    },
    cancer: {
      isChecked: false,
      value: "",
    },
    bloodClots: {
      isChecked: false,
      value: "",
    },
    colitis: {
      isChecked: false,
      value: "",
    },
    bloodTypeNonPathological: {
      isChecked: false,
      values: [],
    },
    smokingNonPathological: {
      isChecked: false,
      value: "",
    },
    alcoholicBeveragesNonPathological: {
      isChecked: false,
      value: "",
    },
    drugsNonPathological: {
      isChecked: false,
      value: "",
    },
    exerciseNonPathological: {
      isChecked: false,
      value: "",
    },
    covidNonPathological: {
      isChecked: false,
      value: "",
    },
    diabetesFamily: {
      isChecked: false,
      values: [],
    },
    cancerFamily: {
      isChecked: false,
      values: [],
    },
    hypertensionFamily: {
      isChecked: false,
      values: [],
    },
    sidaFamily: {
      isChecked: false,
      values: [],
    },
    otherFamily: {
      isChecked: false,
      values: [],
    },
  }