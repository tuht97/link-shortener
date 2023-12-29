import { SwitchCamera } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { Avatar } from "@/components/ui/avatar";
import Image from "next/image";

function Logo() {
  return (
    <Link
      href="/"
      className={buttonVariants({
        className: "flex navLink !p-0 !-mt-1.5",
        variant: "ghost",
        size: "lg",
      })}
    >
      <Avatar className="relative h-8 w-8">
        <Image
          src="http://placekitten.com/g/24/24"
          fill
          alt="TSLH"
          className="rounded-full object-cover"
        />
      </Avatar>
    </Link>
  );
}

export default Logo;
