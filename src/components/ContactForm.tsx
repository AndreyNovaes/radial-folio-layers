import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useSendEmail } from "@/hooks/use-send-email"
import { Mail, CheckCircle2, AlertCircle, Loader, MessageCircle, Phone } from "lucide-react"

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [copiedEmail, setCopiedEmail] = useState(false)

  const { sendEmail, loading, error, success, resetState } = useSendEmail()

  const handleCopyEmail = async () => {
    const email = "andreynovaespro@gmail.com"
    try {
      await navigator.clipboard.writeText(email)
      setCopiedEmail(true)
      setTimeout(() => setCopiedEmail(false), 2000)
    } catch (err) {
      console.error("Erro ao copiar email:", err)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validação básica
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      return
    }

    const result = await sendEmail(formData)

    if (result.success) {
      // Limpar formulário após sucesso
      setFormData({
        name: "",
        email: "",
        message: "",
      })

      // Limpar mensagem de sucesso após 5 segundos
      setTimeout(() => {
        resetState()
      }, 5000)
    }
  }

  return (
    <section id="contato" className="w-full py-10 px-6 bg-muted/20">
      <div className="container mx-auto max-w-2xl">
        <div className="text-center mb-8">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
            Entre em Contato
          </Badge>
          <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Vamos Conversar
          </h2>
          <p className="text-lg text-muted-foreground">
            Envie uma mensagem e responderei assim que possível
          </p>
        </div>

        <Card className="p-8 bg-gradient-to-br from-card/80 to-background border-border/50 backdrop-blur-sm">
          {success ? (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <CheckCircle2 className="w-16 h-16 text-green-500" />
              <div className="text-center">
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Email enviado com sucesso!
                </h3>
                <p className="text-muted-foreground">
                  Obrigado pela mensagem. Responderei em breve.
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nome */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                  Nome *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Seu nome"
                  required
                  className="w-full px-4 py-2.5 rounded-lg bg-muted/30 border border-border/30 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="seu.email@exemplo.com"
                  required
                  className="w-full px-4 py-2.5 rounded-lg bg-muted/30 border border-border/30 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                />
              </div>

              {/* Mensagem */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Mensagem *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Sua mensagem aqui..."
                  required
                  rows={5}
                  className="w-full px-4 py-2.5 rounded-lg bg-muted/30 border border-border/30 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all resize-none"
                />
              </div>

              {/* Erro */}
              {error && (
                <div className="flex items-center gap-3 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              {/* Contato Direto */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {/* Email */}
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="flex items-center gap-3 p-4 rounded-lg bg-primary/5 border border-primary/20 hover:bg-primary/10 transition-all group text-left"
                >
                  <Mail className="w-5 h-5 text-primary group-hover:scale-110 transition-transform flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground">
                      {copiedEmail ? "✓ Copiado!" : "Email"}
                    </p>
                    <p className={`text-sm font-medium truncate transition-colors ${
                      copiedEmail ? "text-green-500" : "text-foreground"
                    }`}>
                      andreynovaespro@gmail.com
                    </p>
                  </div>
                </button>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/5521994312856"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 rounded-lg bg-green-500/5 border border-green-500/20 hover:bg-green-500/10 transition-all group"
                >
                  <MessageCircle className="w-5 h-5 text-green-500 group-hover:scale-110 transition-transform" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground">WhatsApp</p>
                    <p className="text-sm font-medium text-foreground truncate">
                      (21) 99431-2856
                    </p>
                  </div>
                </a>
              </div>

              {/* Botão */}
              <button
                type="submit"
                disabled={loading || !formData.name || !formData.email || !formData.message}
                className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-primary/25"
              >
                {loading ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Mail className="w-5 h-5" />
                    Enviar Mensagem
                  </>
                )}
              </button>

              <p className="text-xs text-muted-foreground text-center">
                Seus dados são enviados diretamente e não são armazenados. Sua privacidade é respeitada.
              </p>
            </form>
          )}
        </Card>
      </div>
    </section>
  )
}
