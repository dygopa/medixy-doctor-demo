import Button from "../BaseComponents/Button";

interface IFooterProps {}

export default function Footer() {
  return (
    <div>
      <div className="text-center mb-6">
        <Button variant="outline-primary">Lo hare después</Button>
      </div>

      <div className="text-center">
        <p className="text-primary font-medium text-lg underline">
          Quiero ver mi tarjeta profesional
        </p>
      </div>
    </div>
  );
}
