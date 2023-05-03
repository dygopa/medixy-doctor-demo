import {
  FormInput,
  FormSelect,
} from "(presentation)/components/core/BaseComponents/Form";

interface IFormularyProps {
  patient: any;
  setPatient: any;
}

export default function Formulary({ patient, setPatient }: IFormularyProps) {
  return (
    <div className="relative flex flex-col gap-4 w-full">
      <div className="flex gap-3 w-full">
        <div className="input-group w-1/3">
          <p className="input-label">Nombre</p>
          <FormInput
            type="text"
            onChange={(e) =>
              setPatient({ ...patient, nombreUsuario: e.target.value })
            }
            placeholder="Nombre"
          />
        </div>
        <div className="input-group w-1/3">
          <p className="input-label">Primer apellido</p>
          <FormInput
            type="text"
            onChange={(e) =>
              setPatient({ ...patient, dadsLastName: e.target.value })
            }
            placeholder="Primer apellido"
          />
        </div>
        <div className="input-group w-1/3">
          <p className="input-label">Segundo apellido</p>
          <FormInput
            type="text"
            onChange={(e) =>
              setPatient({ ...patient, momsLastName: e.target.value })
            }
            placeholder="Segundo apellido"
          />
        </div>
      </div>

      <div className="flex gap-3 w-full">
        <div className="input-group w-1/2">
          <p className="input-label">CURP</p>
          <FormInput
            type="text"
            onChange={(e) =>
              setPatient({ ...patient, identificacion: e.target.value })
            }
            placeholder="CURP"
          />
        </div>
        <div className="input-group w-1/2">
          <p className="input-label">Código postal</p>
          <FormInput
            type="text"
            className="col-lg-5"
            onChange={(e) =>
              setPatient({ ...patient, codPostal: e.target.value })
            }
            placeholder="Código postal"
          />
        </div>
      </div>

      <div className="input-group w-full">
        <p className="input-label">Edad</p>
        <FormInput
          type="number"
          min="0"
          max="100"
          onChange={(e) => setPatient({ ...patient, edad: e.target.value })}
          placeholder="Edad del paciente"
        />
      </div>

      <div className="input-group w-full">
        <p className="input-label">Sexo</p>
        <FormSelect
          className="form-control"
          onChange={(e) => setPatient({ ...patient, sexo: e.target.value })}
        >
          <option value="">Sexo</option>
          <option value="Mujer">Mujer</option>
          <option value="Hombre">Hombre</option>
        </FormSelect>
      </div>

      <div className="input-group w-full">
        <p className="input-label">Teléfono</p>
        <FormInput
          type="text"
          onChange={(e) => setPatient({ ...patient, telefono: e.target.value })}
          placeholder="Teléfono"
        />
      </div>

      <div className="input-group w-full">
        <p className="input-label">Dirección</p>
        <FormInput
          type="text"
          onChange={(e) =>
            setPatient({ ...patient, direccion: e.target.value })
          }
          placeholder="Dirección"
        />
      </div>

      <div className="input-group w-full">
        <p className="input-label">Email</p>
        <FormInput
          type="email"
          onChange={(e) => setPatient({ ...patient, email: e.target.value })}
          placeholder="Email"
        />
      </div>
    </div>
  );
}
