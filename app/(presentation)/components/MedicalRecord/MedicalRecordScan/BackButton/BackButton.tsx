import Lucide from "(presentation)/components/core/BaseComponents/Lucide";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <div className="fixed top-4 left-4">
      <button
        type="button"
        onClick={() => router.back()}
        className="bg-white bg-opacity-10 hover:bg-dark hover:bg-opacity-10 px-2 py-1 rounded-md"
      >
        <Lucide icon="ArrowLeft" color="#fff" size={35} />
      </button>
    </div>
  );
}
