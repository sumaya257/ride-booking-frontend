import Logo from "@/assets/icons/logo";
import { Facebook, Twitter, Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-background  border-border">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row">
        {/* Left side: Logo */}
        <div className="flex items-center gap-2">
          <Logo />
          <span className="text-sm font-medium text-foreground">
            © {new Date().getFullYear()} RideNow. All rights reserved.
          </span>
        </div>

        {/* Right side: Social Icons */}
        <nav className="flex gap-4 text-muted-foreground">
          <a
            href="#"
            aria-label="Facebook"
            className="hover:text-primary transition-colors"
          >
            <Facebook size={18} />
          </a>
          <a
            href="#"
            aria-label="Twitter"
            className="hover:text-primary transition-colors"
          >
            <Twitter size={18} />
          </a>
          <a
            href="#"
            aria-label="GitHub"
            className="hover:text-primary transition-colors"
          >
            <Github size={18} />
          </a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
