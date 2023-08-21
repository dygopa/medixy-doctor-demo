import { IUser } from "domain/core/entities/userEntity";
import Button from "../BaseComponents/Button";
import Link from "next/link";

interface IFooterProps {
  user: IUser;
  customClick: ()=>void;
}

export default function Footer({ user, customClick }:IFooterProps ) {

  let userLink =
  process.env.NEXT_PUBLIC_MARKETPLACE_PROJECT_DOMAIN +
  `/discover/specialists/${user.userId}`;

  return (
    <div>
      <div className="text-center mb-6">
        <Button onClick={customClick} variant="outline-primary">Lo hare después</Button>
      </div>

      <div className="text-center">
        <Link target="_blank" href={userLink} className="text-primary font-medium text-lg underline">
          Quiero ver mi tarjeta profesional
        </Link>
      </div>
    </div>
  );
}
