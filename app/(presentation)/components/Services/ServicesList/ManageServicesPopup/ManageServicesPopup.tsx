export default function ManageServicesPopup() {
  return (
    <div className="fixed bottom-4 right-4">
      <div className="w-[450px] h-[400px] bg-white rounded-md p-4">
        <div>
          <h2 className="text-slate-900 font-bold text-lg">
            Gestión de servicios
          </h2>
        </div>

        <div className="mt-3">
          <p className="text-gray-400 text-md">
            Acá podrás gestionar todos tus servicios creando, editando y
            eliminando los que sean necesarios para tus consultorios digitales.
          </p>
        </div>
      </div>
    </div>
  );
}
