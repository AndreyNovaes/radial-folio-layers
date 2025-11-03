import { useState } from "react"

interface SendEmailParams {
  name: string
  email: string
  message: string
}

interface SendEmailResponse {
  success: boolean
  message?: string
  error?: string
}


export const useSendEmail = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const sendEmail = async (params: SendEmailParams): Promise<SendEmailResponse> => {
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      // Always call Vercel Function at /api/send-email
      // Works in both development (vercel dev) and production
      const response = await fetch('/api/send-email', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      })

      const data = await response.json()

      if (!response.ok) {
        const errorMessage = data.error || "Erro ao enviar email"
        setError(errorMessage)
        return {
          success: false,
          error: errorMessage,
        }
      }

      setSuccess(true)
      return {
        success: true,
        message: "Mensagem enviada com sucesso! Obrigado pelo contato.",
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Erro ao enviar email"
      setError(errorMessage)
      console.error("Erro ao enviar email:", err)
      return {
        success: false,
        error: errorMessage,
      }
    } finally {
      setLoading(false)
    }
  }

  const resetState = () => {
    setError(null)
    setSuccess(false)
  }

  return {
    sendEmail,
    loading,
    error,
    success,
    resetState,
  }
}
