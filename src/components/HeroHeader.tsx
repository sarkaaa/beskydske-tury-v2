import Image from "next/image";
import headerImage from "@/images/header.png";

export default function HeroHeader({ title, subtitle, mainHeader }: { title: string, subtitle?: string, mainHeader?: boolean }) {
  return (
    <div className={`relative flex overflow-hidden -mt-12 ${mainHeader ? "min-h-[600px]" : "min-h-[300px]"}`}>
      <span className="absolute inset-0 block">
        <Image
          src={headerImage}
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      </span>
      <div className="relative z-10 m-auto flex flex-col justify-center min-h-[200px] max-w-5xl items-center px-4 py-8 sm:px-6 lg:px-8">
          <h1 className="text-xl font-bold tracking-tight text-white drop-shadow-md sm:text-7xl text-center text-shadow-lg">
            {title}
          </h1>
          {subtitle && (
            <h2 className="tile-title mt-4 text-white/95 drop-shadow-sm text-center text-shadow-lg">
              {subtitle}
            </h2>
          )}
      </div>
    </div>
  );
}
