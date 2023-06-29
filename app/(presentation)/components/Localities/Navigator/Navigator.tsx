import Button from "(presentation)/components/core/BaseComponents/Button";
import Link from "next/link";

export default function Navigator() {
  return (
    <div className="w-full md:flex justify-between items-start sticky top-[67px] z-[50]  bg-slate-100 py-3">
      <h2 className="lg:mr-5 lg:mb-0 mb-4 text-2xl font-bold truncate">
        Consultorios
      </h2>
      <Link href={"/localities/create"}>
        <Button variant="primary" className="w-full md:w-auto">Nuevo consultorio</Button>
      </Link>
    </div>
  );
}
