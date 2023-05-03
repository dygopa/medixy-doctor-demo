import Button from "(presentation)/components/core/BaseComponents/Button";
import Link from "next/link";

export default function Navigator() {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="mr-5 text-2xl font-bold truncate">
            Expediente médico
          </h2>
        </div>

        <div>
          <Link href="/">
            <Button variant="primary">Nueva consulta</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
