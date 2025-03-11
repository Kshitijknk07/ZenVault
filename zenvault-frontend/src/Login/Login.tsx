import { SignIn } from "@clerk/clerk-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Shield, Lock, ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"

const Login = () => {
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
        <p className="text-muted-foreground">Secure access to your digital assets</p>
      </div>

      <Card className="w-full max-w-md shadow-soft-xl border-border bg-white/90 backdrop-blur-sm relative z-10">
        <div className="absolute -top-1 -bottom-1 -left-1 -right-1 rounded-2xl bg-gradient-to-r from-accent/20 via-accent/0 to-accent/20 animate-pulse-slow -z-10"></div>
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
          <CardDescription>Sign in to your account to continue</CardDescription>
        </CardHeader>
        <CardContent>
          <SignIn />
        </CardContent>
      </Card>

      <div className="mt-8 flex items-center justify-center text-sm text-muted-foreground relative z-10">
        <Lock className="h-4 w-4 mr-2 text-accent" />
        <p>Your data is protected with enterprise-grade encryption</p>
      </div>
    </div>
  )
}

export default Login