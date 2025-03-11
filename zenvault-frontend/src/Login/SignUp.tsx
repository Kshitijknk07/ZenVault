import { SignUp } from "@clerk/clerk-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Shield, Lock, ArrowLeft, CheckCircle, Sparkles } from "lucide-react"
import { Link } from "react-router-dom"
import { useEffect } from "react"

const SignUpPage = () => {
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

      <div className="w-full max-w-5xl mx-auto relative z-10">
        <div className="flex items-center justify-center mb-6">
          <div className="flex items-center justify-center h-14 w-14 rounded-xl bg-accent text-white shadow-accent-sm">
            <Shield className="h-7 w-7" />
          </div>
          <h1 className="text-3xl font-bold ml-3">ZenVault</h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-stretch">
          <Card className="w-full lg:w-3/5 shadow-soft-xl border-border bg-white/95 backdrop-blur-sm relative">
            <div className="absolute -top-1 -bottom-1 -left-1 -right-1 rounded-2xl bg-gradient-to-r from-accent/20 via-accent/0 to-accent/20 animate-pulse-slow -z-10"></div>
            <CardHeader className="space-y-1 text-center pb-2">
              <CardTitle className="text-2xl font-bold">Create your account</CardTitle>
              <CardDescription>Join ZenVault and secure your digital assets</CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="cl-rootBox">
                <SignUp routing="path" path="/signup" signInUrl="/login" />
              </div>
            </CardContent>
          </Card>

          <div className="w-full lg:w-2/5 bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-border shadow-soft-xl flex flex-col">
            <div className="flex items-center mb-6">
              <div className="flex items-center justify-center h-8 w-8 rounded-full bg-accent/10 text-accent mr-3">
                <Sparkles className="h-4 w-4" />
              </div>
              <h3 className="text-xl font-bold">Why choose ZenVault?</h3>
            </div>

            <ul className="space-y-5 flex-grow">
              {[
                'Military-grade encryption for all your files',
                'Access your data from any device, anywhere',
                'Intuitive sharing with granular permissions',
                'Automatic backups and version history',
                'Free plan with generous storage options'
              ].map((benefit, i) => (
                <li key={i} className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-accent/10 flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                    <CheckCircle className="h-3.5 w-3.5 text-accent" />
                  </div>
                  <span className="text-muted-foreground">{benefit}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 pt-6 border-t border-border">
              <div className="flex items-center text-sm text-muted-foreground">
                <Lock className="h-4 w-4 mr-2 text-accent" />
                <p>Your data is protected with enterprise-grade encryption</p>
              </div>
            </div>

            <div className="mt-6 bg-gradient-accent rounded-xl p-4 text-white shadow-accent-sm">
              <p className="text-sm font-medium">Join thousands of users who trust ZenVault with their important files</p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-accent/5 to-transparent -z-10"></div>
    </div>
  )
}

export default SignUpPage