import Image from "next/image";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full flex border-b bg-background/95 px-4">
      <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between gap-4">
        <Image
          src={"/amnezia-logo.png"}
          alt="Amnezia logo"
          width={120}
          height={32}
        />
      </div>
    </header>
  );
}
