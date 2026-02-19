import Image from "next/image";
import headerImage from "@/images/header.png";

export default function HeroHeader({
  title,
  subtitle,
  mainHeader,
}: {
  title: string;
  subtitle?: string;
  mainHeader?: boolean;
}) {
  return (
    <div
      className={`relative -mt-12 flex min-h-[250px] overflow-hidden ${mainHeader ? "sm:min-h-[600px]" : "sm:min-h-[300px]"}`}
    >
      <span className="absolute inset-0 block">
        <Image src={headerImage} alt={title} fill className="object-cover" sizes="100vw" priority />
      </span>
      <div className="relative z-10 m-auto flex min-h-[200px] max-w-5xl flex-col items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
        <h1
          data-testid="hero-title"
          className="text-center font-bold text-4xl text-shadow-lg text-white tracking-tight drop-shadow-md sm:text-7xl"
        >
          {title}
        </h1>
        {subtitle && (
          <h2 data-testid="hero-subtitle" className="title-subtitle">
            {subtitle}
          </h2>
        )}
      </div>
    </div>
  );
}
