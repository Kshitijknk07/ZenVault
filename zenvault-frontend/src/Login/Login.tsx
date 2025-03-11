import { SignIn } from "@clerk/clerk-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Shield, Lock, ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"
import { useEffect } from "react"

const Login = () => {
  useEffect(() => {
    const applyClerkStyles = () => {
      const clerkRoot = document.querySelector('.cl-rootBox')
      if (clerkRoot) {
        clerkRoot.setAttribute('style', 'width: 100%; max-width: 100%;')

        const formElements = document.querySelectorAll('.cl-formButtonPrimary')
        formElements.forEach(el => {
          el.setAttribute('style', 'background: linear-gradient(135deg, hsl(243, 75%, 59%), hsl(243, 75%, 59%, 0.8)); font-family: "Plus Jakarta Sans", sans-serif;')
        })

        const inputElements = document.querySelectorAll('.cl-formFieldInput')
        inputElements.forEach(el => {
          el.setAttribute('style', 'border-radius: 0.75rem; font-family: "Plus Jakarta Sans", sans-serif;')
        })

        const socialButtons = document.querySelectorAll('.cl-socialButtonsIconButton')
        socialButtons.forEach(el => {
          el.setAttribute('style', 'border-radius: 0.75rem; font-family: "Plus Jakarta Sans", sans-serif;')
        })
      }
    }

    const observer = new MutationObserver((mutations) => {
      mutations.forEach(() => {
        applyClerkStyles()
      })
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true
    })

    applyClerkStyles()

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-radial from-accent/5 to-transparent p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-30"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-background to-transparent"></div>

      <div className="absolute top-6 left-6 z-20">
        <Link to="/" className="inline-flex items-center text-accent hover:text-accent/80 transition-all duration-200 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg shadow-sm">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to home
        </Link>
      </div>

      <div className="w-full max-w-md mb-8 text-center relative z-10">
        <div className="flex items-center justify-center mb-4">
          <div className="flex items-center justify-center h-14 w-14 rounded-xl bg-accent text-white shadow-accent-sm">
            <Shield className="h-7 w-7" />
          </div>
          <h1 className="text-3xl font-bold ml-3">ZenVault</h1>
        </div>
        <p className="text-muted-foreground text-lg">Secure access to your digital assets</p>
      </div>

      <Card className="w-full max-w-md shadow-soft-xl border-border bg-white/95 backdrop-blur-sm relative z-10">
        <div className="absolute -top-1 -bottom-1 -left-1 -right-1 rounded-2xl bg-gradient-to-r from-accent/20 via-accent/0 to-accent/20 animate-pulse-slow -z-10"></div>
        <CardHeader className="space-y-1 text-center pb-2">
          <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
          <CardDescription>Sign in to your account to continue</CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="cl-rootBox">
            <SignIn routing="path" path="/login" signUpUrl="/signup" />
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 flex items-center justify-center text-sm text-muted-foreground relative z-10 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
        <Lock className="h-4 w-4 mr-2 text-accent" />
        <p>Your data is protected with enterprise-grade encryption</p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-accent/5 to-transparent -z-10"></div>
    </div>
  )
}

export default Login