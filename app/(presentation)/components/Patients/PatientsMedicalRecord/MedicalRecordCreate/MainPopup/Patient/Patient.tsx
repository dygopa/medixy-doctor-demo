import Image from "next/image";

export default function Patient() {
  return (
    <div className="flex">
      <div className="text-center">
        <div className="mb-4 mr-4">
          <Image
            className="object-cover rounded-full"
            src="https://accountmanagement.gettyimages.com/Account/ProfileImage/8b931d4f-f756-4ae1-9380-e4ed329a4ce1.jpg"
            alt=""
            width={75}
            height={75}
          />
        </div>
      </div>

      <div className="relative">
        <div className="mb-1">
          <h2 className="font-bold text-2xl">Jose Hernandez</h2>
        </div>

        <div>
          <span>jose.hernandez@gmail.com</span>
        </div>
      </div>
    </div>
  );
}
