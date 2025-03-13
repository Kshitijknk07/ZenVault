import { SignUp } from "@clerk/clerk-react"
import { Shield, Lock, ArrowLeft } from "lucide-react"
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
    <div className="h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
      <div className="absolute top-4 left-4 z-20">
        <Link to="/" className="inline-flex items-center text-accent hover:text-accent/80 transition-all duration-200 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-sm hover:shadow-md text-sm">
          <ArrowLeft className="h-3.5 w-3.5 mr-1.5" />
          Back to home
        </Link>
      </div>

      <div className="w-full max-w-4xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row gap-8 items-center">
          <div className="w-full lg:w-1/2">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-soft-xl">
              <div className="cl-rootBox">
                <SignUp routing="path" path="/signup" signInUrl="/login" />
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 space-y-6">
            <div className="flex items-center">
              <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-accent text-white shadow-accent-sm">
                <Shield className="h-5 w-5" />
              </div>
              <h1 className="text-xl font-bold ml-2">ZenVault</h1>
            </div>
            
            <div>
              <h2 className="text-lg font-semibold mb-2">Create your secure account</h2>
              <p className="text-muted-foreground text-sm">Join ZenVault and secure your digital assets with enterprise-grade encryption</p>
            </div>

            <div className="flex items-center text-sm text-muted-foreground">
              <Lock className="h-4 w-4 mr-2 text-accent" />
              <p>Your data is protected with enterprise-grade encryption</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUpPage