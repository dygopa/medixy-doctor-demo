import OrdersList from "./OrdersList/OrdersList";

interface IOrdersProps {
  subjectId: number;
}

export default function Orders({ subjectId }: IOrdersProps) {
  return (
    <div>
      <OrdersList subjectId={subjectId} />
    </div>
  );
}
