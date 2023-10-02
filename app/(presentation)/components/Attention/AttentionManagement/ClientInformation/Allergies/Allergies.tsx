import { useContext, useEffect, useState } from "react";
import {
  AttentionContext,
  IAttentionContext,
} from "../../context/AttentionContext";
import { TextGroup } from "../../TextGroup/TextGroup";

export default function Allergies() {
  const { state, actions, dispatch } =
    useContext<IAttentionContext>(AttentionContext);
  const { getAllergies } = actions;
  const { data: subject } = state.subject;
  const { data, loading, error, successful } = state.allergies;

  const [allergy, setAllergy] = useState<string>("");

  const onGetAllergiesDispatch = () => {
    if (subject?.subjectId) {
      getAllergies({
        subjectId: subject.subjectId,
        limit: 5,
      })(dispatch);
    }
  };

  useEffect(() => {
    onGetAllergiesDispatch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (successful) setAllergiesMap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successful]);

  const setAllergiesMap = () => {
    if (data.data.length === 0) return;

    const allergiesList: string[] = [];
    let allergyString = "";

    data.data.forEach((allergy) => {
      if (allergy.medicalRecordValues.length > 0) {
        allergy.medicalRecordValues.forEach((allergyValue) => {
          if (allergiesList.indexOf(allergyValue.value) < 0) {
            allergiesList.push(allergyValue.value);

            allergyString = allergyString + `, ${allergyValue.value}`;
          }
        });
      }
    });

    setAllergy(allergyString);
  };

  if (loading || error || !data.data || data.data.length === 0) return <div />;

  return <TextGroup label={"Alergias"} data={allergy} />;
}
