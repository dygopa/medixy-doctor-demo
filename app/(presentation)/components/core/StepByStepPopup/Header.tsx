import { IUser } from "domain/core/entities/userEntity";

export default function Header({user}:{user:IUser}) {
  return (
    <div>
      <div className="text-center mb-3">
        <h6 className="text-lg" style={{ color: "#000066" }}>
          Te damos la bienvenida
        </h6>
      </div>

      <div className="text-center mb-6">
        <h3 className="text-[25px] font-bold" style={{ color: "#000066" }}>
          {user?.sex === 1 ? "Dra." : "Dr."} {`${user?.names} ${user?.firstName} ${user?.lastName}`}
        </h3>
      </div>

      <div className="text-center">
        <p className="text-[16px] text-gray-400">
          Ahora te vamos a guiar para que pueda comenzar a trabajar
          <br />
          con la plataforma de manera eficiente. Por favor completa los
          siguientes pasos:
        </p>
      </div>
    </div>
  );
}
