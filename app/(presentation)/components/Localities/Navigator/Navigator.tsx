import Button from "(presentation)/components/core/BaseComponents/Button";
import Link from "next/link";

export default function Navigator() {
  return (
    <div className="w-full flex justify-between items-center">
      <h2 className="mr-5 text-2xl font-bold truncate">Consultorios</h2>
      <Link href={"/localities/create"}>
        <Button variant="primary">Nuevo consultorio</Button>
      </Link>
    </div>
  );
}
