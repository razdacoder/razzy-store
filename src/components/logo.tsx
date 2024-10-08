import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/">
      <Image
        src="/razzy-store-logo.png"
        alt="Logo"
        width={100}
        height={100}
        className="w-[75px] md:w-[100px]"
      />
    </Link>
  );
}
