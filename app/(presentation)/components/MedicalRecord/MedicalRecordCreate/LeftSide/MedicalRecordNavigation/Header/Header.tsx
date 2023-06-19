export default function Header() {
  return (
    <div className="w-full">
      <div className="lg:flex items-center justify-between">
        <div>
          <div className="flex items-center">
            <div className="mr-4">
              <p className="text-slate-500 text-md">Consultorio</p>
            </div>

            <div>
              <p className="text-slate-900 text-lg">Coyoacán</p>
            </div>
          </div>

          <div className="mb-2">
            <h2 className="font-bold text-2xl truncate">Consulta actual</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
