import { SignUp } from "@clerk/clerk-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Shield, Lock, ArrowLeft, CheckCircle } from "lucide-react"
import { Link } from "react-router-dom"

const SignUpPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-radial from-accent/5 to-transparent p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-background to-transparent"></div>

      <div className="w-full max-w-md mb-8 text-center relative z-10">
        <Link to="/" className="inline-flex items-center text-accent hover:text-accent/80 mb-8 transition-all duration-200">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to home
        </Link>

        <div className="flex items-center justify-center mb-4">
          <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-accent text-white shadow-accent-sm">
            <Shield className="h-6 w-6" />
          </div>
          <h1 className="text-3xl font-bold ml-3">ZenVault</h1>
        </div>
        <p className="text-muted-foreground">Create your secure ZenVault account</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-start w-full max-w-4xl relative z-10">
        <Card className="w-full md:w-3/5 shadow-soft-xl border-border bg-white/90 backdrop-blur-sm">
          <div className="absolute -top-1 -bottom-1 -left-1 -right-1 rounded-2xl bg-gradient-to-r from-accent/20 via-accent/0 to-accent/20 animate-pulse-slow -z-10"></div>
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold">Sign Up</CardTitle>
            <CardDescription>Create an account to get started</CardDescription>
          </CardHeader>
          <CardContent>
            <SignUp />
          </CardContent>
        </Card>

        <div className="w-full md:w-2/5 bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Why choose ZenVault?</h3>
          <ul className="space-y-4">
            {[
              'Military-grade encryption for all your files',
              'Access your data from any device, anywhere',
              'Intuitive sharing with granular permissions',
              'Automatic backups and version history',
              'Free plan with generous storage options'
            ].map((benefit, i) => (
              <li key={i} className="flex">
                <CheckCircle className="h-5 w-5 text-accent mr-3 flex-shrink-0" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6 pt-6 border-t border-border">
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