import Order from "./Order/Order";

export default function OrdersList() {
  return (
    <div className="mt-4">
      <div className="mb-4">
        <Order text="Rayos X Tóraz" />
      </div>

      <div className="mb-4">
        <Order text="Hemograma completo" />
      </div>

      <div className="mb-4">
        <Order text="Perfil lípidico" />
      </div>
    </div>
  );
}
