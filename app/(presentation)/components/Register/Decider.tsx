import Formulary from "./Formulary/Formulary";
import FinishRegister from "./FinishRegister/FinishRegister";
import { IUser } from "domain/core/entities/userEntity";

interface IDeciderProps {
  user: IUser | null;
}

export default function Decider({ user }: IDeciderProps) {
  return (
    <>
      {!user && <Formulary />}
      {user && user.userId && <FinishRegister user={user} />}
    </>
  );
}
