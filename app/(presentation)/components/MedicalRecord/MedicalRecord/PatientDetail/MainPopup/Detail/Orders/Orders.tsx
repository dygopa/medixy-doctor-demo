import { IUser } from "domain/core/entities/userEntity";
import OrdersList from "./OrdersList/OrdersList";

interface IOrdersProps {
  user: IUser;
  subjectId: number;
}

export default function Orders({ user, subjectId }: IOrdersProps) {
  return (
    <div>
      <OrdersList user={user} subjectId={subjectId} />
    </div>
  );
}
