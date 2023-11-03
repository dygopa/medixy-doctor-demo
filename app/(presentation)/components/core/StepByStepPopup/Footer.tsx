import { IUser } from "domain/core/entities/userEntity";
import Button from "../BaseComponents/Button";
import Link from "next/link";
import { ConfigEnviroment } from "infrastructure/config/env/env";

interface IFooterProps {
  user: IUser;
  customClick: () => void;
  disabled?: boolean;
}

export default function Footer({
  user,
  customClick,
  disabled = false,
}: IFooterProps) {
  let userLink =
    new ConfigEnviroment().nextPublicMarketPlaceDomain +
    `/discover/specialists/${user?.userId}`;

  if (disabled) return <div />;

  return (
    <div>
      <div className="text-center mb-6">
        <Button onClick={customClick} variant="outline-primary">
          Lo hare después
        </Button>
      </div>

      <div className="text-center">
        <Link
          target="_blank"
          href={userLink}
          className="text-primary font-medium text-lg underline"
        >
          Quiero ver mi tarjeta profesional
        </Link>
      </div>
    </div>
  );
}
