import Button from "../../BaseComponents/Button";

interface IErrorMessageProps {
  title?: string;
  description?: string;
  retry?: () => void | null;
}

export default function ErrorMessage({
  title = "Algo no ha salido como se esperaba",
  description = "Lo sentimos, ha ocurrido algo inésperado al procesar su solicitud. Intentalo de nuevo.",
  retry,
}: IErrorMessageProps) {
  return (
    <div className="overflow-hidden">
      <div className="text-center">
        <div className="mb-5">
          <h2 className="text-lg font-bold text-center intro-x">{title}</h2>
        </div>

        <div className="mb-8">
          <span>{description}</span>
        </div>

        {retry && (
          <div className="mb-4">
            <Button variant="primary" onClick={retry}>
              Volver a intentar
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
