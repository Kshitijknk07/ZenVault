import { SignIn } from "@clerk/clerk-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Shield, Lock } from "lucide-react"

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-muted/30 p-4">
      <div className="w-full max-w-md mb-8 text-center">
        <div className="flex items-center justify-center mb-4">
          <Shield className="h-10 w-10 text-primary" />
          <h1 className="text-3xl font-bold ml-2">ZenVault</h1>
        </div>
        <p className="text-muted-foreground">Secure access to your digital assets</p>
      </div>

      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
          <CardDescription>Sign in to your account to continue</CardDescription>
        </CardHeader>
        <CardContent>
          <SignIn />
        </CardContent>
      </Card>

      <div className="mt-8 flex items-center justify-center text-sm text-muted-foreground">
        <Lock className="h-4 w-4 mr-2" />
        <p>Your data is protected with enterprise-grade encryption</p>
      </div>
    </div>
  )
}

export default Login