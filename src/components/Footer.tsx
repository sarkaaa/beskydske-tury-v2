import { FaGithub, FaInstagram } from "react-icons/fa";

const socialLinks = [
  { href: "https://github.com/beskydsky-tury-v2", icon: FaGithub, label: "GitHub" },
  { href: "https://instagram.com/beskydskytury", icon: FaInstagram, label: "Instagram" },
];

export default function Footer() {
  return (
    <footer className="mt-auto bg-gray-100">
      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-green-800">
            Beskydské túry, 2026
          </p>
          <div className="flex items-center gap-6">
            {socialLinks.map(({ href, icon: Icon, label }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-700 transition-colors hover:text-green-600"
                aria-label={label}
              >
                <Icon className="h-6 w-6" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
