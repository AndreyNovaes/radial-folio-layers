import { useState, useEffect } from "react";
import { Mail, X, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ContactStickerProps {
  email: string;
  triggerVisible?: boolean;
  onTrigger?: () => void;
  onTriggerOpen?: () => void;
}

export const ContactSticker = ({
  email,
  triggerVisible = false,
  onTrigger,
  onTriggerOpen
}: ContactStickerProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (triggerVisible) {
      setIsVisible(true);
      onTrigger?.();
      return;
    }

    // Auto-show after 4 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, [triggerVisible, onTrigger]);


  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-40 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="relative">
        {/* Sticker Card - Subtle & Compact */}
        <div className="bg-gradient-to-br from-card/60 to-muted/20 border border-primary/20 rounded-xl p-3 shadow-md backdrop-blur-sm max-w-xs hover:shadow-lg transition-shadow">
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute -top-2 -right-2 p-1 bg-muted hover:bg-muted/80 rounded-full transition-colors"
            aria-label="Close contact sticker"
          >
            <X className="w-3 h-3 text-muted-foreground" />
          </button>

          {/* Content */}
          <div className="space-y-2">
            <div className="flex items-start gap-2 pr-6">
              <div className="p-1.5 bg-primary/10 rounded">
                <Mail className="w-4 h-4 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-xs text-foreground">
                  Vamos Conversar?
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Escolha seu meio
                </p>
              </div>
            </div>

            {/* Buttons Grid */}
            <div className="space-y-1.5 pt-1">
              {/* Open Contact Form */}
              <button
                onClick={() => {
                  onTriggerOpen?.();
                  setIsVisible(false);
                }}
                className="w-full px-3 py-1.5 text-xs font-medium text-center rounded bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Formulário
              </button>

              {/* Copy Email */}
              <Button
                onClick={handleCopyEmail}
                variant="outline"
                size="sm"
                className="w-full text-xs h-7 px-2 py-0 border-primary/30 hover:bg-primary/5"
              >
                {isCopied ? "✓ Copiado" : "Email"}
              </Button>

              {/* WhatsApp Button */}
              <a
                href="https://wa.me/5521994312856"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full px-3 py-1.5 text-xs font-medium text-center rounded bg-green-500/10 text-green-600 hover:bg-green-500/20 border border-green-500/20 transition-colors flex items-center justify-center gap-1"
              >
                <MessageCircle className="w-3 h-3" />
                WhatsApp
              </a>
            </div>
          </div>

          {/* Subtle Pulse */}
          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-primary/15 rounded-full animate-pulse opacity-50" />
        </div>
      </div>
    </div>
  );
};
