import { IUser } from "domain/core/entities/userEntity";
import OrdersList from "./OrdersList/OrdersList";

interface IOrdersProps {
  user: IUser;
  subjectId: number;
}

export default function Orders({ user, subjectId }: IOrdersProps) {
  return (
    <div>
      <div className="mb-3">
        <p className="text-lg font-bold">Ordenes</p>
      </div>

      <div>
        <OrdersList subjectId={subjectId} user={user} />
      </div>
    </div>
  );
}
