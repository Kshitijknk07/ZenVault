
import { Shield, Lock, Eye, Fingerprint } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function SecuritySection() {
  return (
    <section id="security" className="py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <Badge variant="outline" className="mb-4">
              Bank-Level Security
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Your Data Deserves the Best Protection
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              At ZenVault, security isn't just a feature—it's our foundation. We employ state-of-the-art encryption and security measures to ensure your data remains private and protected.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <div className="mt-1 h-6 w-6 rounded-full bg-green-500/10 flex items-center justify-center">
                  <Lock className="h-3 w-3 text-green-500" />
                </div>
                <div>
                  <h4 className="font-medium">End-to-end Encryption</h4>
                  <p className="text-muted-foreground">Your files are encrypted before they leave your device</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="mt-1 h-6 w-6 rounded-full bg-green-500/10 flex items-center justify-center">
                  <Eye className="h-3 w-3 text-green-500" />
                </div>
                <div>
                  <h4 className="font-medium">Zero-Knowledge Architecture</h4>
                  <p className="text-muted-foreground">We can't access your data even if we wanted to</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="mt-1 h-6 w-6 rounded-full bg-green-500/10 flex items-center justify-center">
                  <Fingerprint className="h-3 w-3 text-green-500" />
                </div>
                <div>
                  <h4 className="font-medium">Two-Factor Authentication</h4>
                  <p className="text-muted-foreground">Extra layer of security for your account</p>
                </div>
              </div>
            </div>

            <Button size="lg">Learn About Our Security</Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-zen-teal to-zen-blue opacity-10 blur-2xl rounded-full"></div>
            <div className="relative glass-card rounded-2xl p-6 md:p-10 overflow-hidden">
              <div className="flex justify-center mb-10">
                <Shield className="h-24 w-24 text-accent animate-float" />
              </div>
              
              <div className="space-y-6">
                <div className="bg-background/40 dark:bg-white/5 p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <Lock className="h-5 w-5 text-accent" />
                    <div className="font-medium">AES-256 Encryption</div>
                  </div>
                  <div className="h-2 w-full bg-secondary/50 rounded-full overflow-hidden">
                    <div className="h-full w-full bg-gradient-to-r from-zen-blue to-zen-teal"></div>
                  </div>
                </div>
                
                <div className="bg-background/40 dark:bg-white/5 p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <Shield className="h-5 w-5 text-accent" />
                    <div className="font-medium">GDPR Compliance</div>
                  </div>
                  <div className="h-2 w-full bg-secondary/50 rounded-full overflow-hidden">
                    <div className="h-full w-full bg-gradient-to-r from-zen-blue to-zen-teal"></div>
                  </div>
                </div>
                
                <div className="bg-background/40 dark:bg-white/5 p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <Fingerprint className="h-5 w-5 text-accent" />
                    <div className="font-medium">Biometric Authentication</div>
                  </div>
                  <div className="h-2 w-full bg-secondary/50 rounded-full overflow-hidden">
                    <div className="h-full w-[85%] bg-gradient-to-r from-zen-blue to-zen-teal"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
