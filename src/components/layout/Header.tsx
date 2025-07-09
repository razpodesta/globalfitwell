// src/components/layout/Header.tsx
import Link from "next/link";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

interface HeaderProps {
  brandName: string;
  slogan: string;
  navLinks: { label: string; href: string }[];
  buttonText: string;
  affiliateUrl: string;
}

export function Header({
  brandName,
  slogan,
  navLinks,
  buttonText,
  affiliateUrl,
}: HeaderProps) {
  return (
    <Container>
      <div className="flex h-20 items-center justify-between text-white">
        <div className="flex items-center gap-2">
          <Link
            href="/"
            aria-label="Página de inicio"
            className="flex h-10 w-10 items-center justify-center rounded-md transition-colors hover:bg-white/20"
          >
            <Home className="h-5 w-5" />
          </Link>
          <span className="font-bold text-xl tracking-tighter">
            {brandName}
          </span>
        </div>
        <div className="hidden lg:flex flex-grow items-center justify-center">
          <span className="text-lg font-semibold tracking-tight">{slogan}</span>
        </div>
        <div className="flex items-center gap-6">
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-medium hover:text-gray-300 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="hidden md:block">
            <Button
              href={affiliateUrl}
              className="bg-brand-success hover:bg-brand-success-dark focus-visible:ring-brand-success text-white"
            >
              {buttonText}
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
}
