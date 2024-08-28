import Image from "next/image";

export default function Logo() {
  return (
    <Image
      src="/logo-black.svg"
      alt="Logo"
      width={100}
      height={100}
      className="w-[75px] md:w-[100px]"
    />
  );
}
