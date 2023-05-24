export const handleConsultationDateErrors = (value: string) => {
    if (value.length === 0) {

      return true;
    }

   return false
  };

  export const handleConsultationReasonErrors = (value: string) => {
    if (value.length === 0) {
      return true;
    }

    return false
  };

  export const handleSizeErrors = (value: string) => {
    if (!/^\d*\.?\d*$/.test(value)) {
        return true;
    }

    return false
  };

  export const handleWeightErrors = (value: string) => {
    if (!/^\d*\.?\d*$/.test(value)) {
        return true;
    }

    return false
  };

  export const handleTemperatureErrors = (value: string) => {
    if (!/^\d*\.?\d*$/.test(value)) {
        return true;
    }

    return false
  };

  export const handleRespiratoryFrequencyErrors = (value: string) => {
    if (!/^\d*\.?\d*$/.test(value)) {
        return true;
    }

    return false
  };

  export const handleOximetryErrors = (value: string) => {
    if (!/^\d*\.?\d*$/.test(value)) {
        return true;
    }

    return false
  };

  export const handleMuscleMassErrors = (value: string) => {
    if (!/^\d*\.?\d*$/.test(value)) {
        return true;
    }

    return false
  };

  export const handleGlicemyErrors = (value: string) => {
    if (!/^\d*\.?\d*$/.test(value)) {
        return true;
    }

    return false
  };
