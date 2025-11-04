import { useState } from "react";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  onContactClick?: () => void;
}

export const Navbar = ({ onContactClick }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [ripples, setRipples] = useState<
    Array<{ id: number; x: number; y: number; linkHref: string }>
  >([]);

  const links = [
    { label: "Sobre", href: "#sobre" },
    { label: "Trajetória", href: "#trajetoria" },
    { label: "Competências", href: "#competencias" },
    { label: "Artigos", href: "#artigos" },
    { label: "Contato", href: "#contato" },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    const linkHref = e.currentTarget.getAttribute("href") || "";

    // Special handling for Contato link
    if (linkHref === "#contato") {
      e.preventDefault();
      onContactClick?.();
      return;
    }

    setRipples([...ripples, { id, x, y, linkHref }]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== id));
    }, 600);

    // Scroll suave
    e.preventDefault();
    if (linkHref) {
      const element = document.querySelector(linkHref);
      element?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <style>{`
        @keyframes ripple {
          0% {
            transform: scale(0);
            opacity: 1;
          }
          100% {
            transform: scale(4);
            opacity: 0;
          }
        }
        .ripple {
          animation: ripple 0.6s ease-out;
        }
      `}</style>

      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={handleLogoClick}
            className="font-bold text-lg bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent hover:opacity-80 transition-opacity cursor-pointer"
            aria-label="Go to top"
          >
            Andrey
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleLinkClick}
                className="relative text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-200 group overflow-hidden rounded-md px-3 py-1.5"
              >
                {/* Ripple Effects */}
                {ripples
                  .filter((ripple) => ripple.linkHref === link.href)
                  .map((ripple) => (
                    <span
                      key={ripple.id}
                      className="ripple absolute bg-primary/40 rounded-full pointer-events-none"
                      style={{
                        left: `${ripple.x}px`,
                        top: `${ripple.y}px`,
                        width: "10px",
                        height: "10px",
                        marginLeft: "-5px",
                        marginTop: "-5px",
                      }}
                    />
                  ))}

                {/* Underline Animation */}
                <span className="relative inline-block">
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </span>
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-3 border-t border-border/50 pt-4 animate-in fade-in slide-in-from-top-2 duration-300">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-200 relative group px-3 py-2 rounded-md hover:bg-primary/10"
                onClick={(e) => {
                  handleLinkClick(e);
                  setIsOpen(false);
                }}
              >
                <span className="relative">
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </span>
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};
