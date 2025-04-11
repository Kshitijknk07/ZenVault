import { Shield, Lock, Eye, Fingerprint } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import WorldMap from "@/components/ui/world-map";

export function SecuritySectionHero() {
  return (
    <section id="security-hero" className="py-24">
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
              At ZenVault, security isn't just a feature—it's our foundation. We
              employ state-of-the-art encryption and security measures to ensure
              your data remains private and protected.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <div className="mt-1 h-6 w-6 rounded-full bg-green-500/10 flex items-center justify-center">
                  <Lock className="h-3 w-3 text-green-500" />
                </div>
                <div>
                  <h4 className="font-medium">End-to-end Encryption</h4>
                  <p className="text-muted-foreground">
                    Your files are encrypted before they leave your device
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-1 h-6 w-6 rounded-full bg-green-500/10 flex items-center justify-center">
                  <Eye className="h-3 w-3 text-green-500" />
                </div>
                <div>
                  <h4 className="font-medium">Zero-Knowledge Architecture</h4>
                  <p className="text-muted-foreground">
                    We can't access your data even if we wanted to
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-1 h-6 w-6 rounded-full bg-green-500/10 flex items-center justify-center">
                  <Fingerprint className="h-3 w-3 text-green-500" />
                </div>
                <div>
                  <h4 className="font-medium">Two-Factor Authentication</h4>
                  <p className="text-muted-foreground">
                    Extra layer of security for your account
                  </p>
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

export function SecuritySection() {
  return (
    <section id="security" className="py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Your Data, <span className="gradient-text">Your Control</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              ZenVault prioritizes your privacy with advanced security features.
              Your files are stored locally and protected with state-of-the-art
              encryption, ensuring your sensitive information remains private
              and secure.
            </p>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="h-12 w-12 rounded-lg bg-zen-blue/10 flex items-center justify-center shrink-0">
                  <Lock className="h-6 w-6 text-zen-blue" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    End-to-End Encryption
                  </h3>
                  <p className="text-muted-foreground">
                    Your files are encrypted before they're stored, ensuring
                    only you can access them.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="h-12 w-12 rounded-lg bg-zen-purple/10 flex items-center justify-center shrink-0">
                  <Shield className="h-6 w-6 text-zen-purple" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    Local Storage Security
                  </h3>
                  <p className="text-muted-foreground">
                    Your data stays on your trusted systems, never exposed to
                    third-party servers.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="h-12 w-12 rounded-lg bg-zen-teal/10 flex items-center justify-center shrink-0">
                  <Eye className="h-6 w-6 text-zen-teal" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    Privacy-First Design
                  </h3>
                  <p className="text-muted-foreground">
                    We've built ZenVault with privacy as the foundation, not an
                    afterthought.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="glass-card rounded-xl p-8 relative z-10">
              <div className="bg-primary/10 p-6 rounded-lg mb-6">
                <Shield className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Security First</h3>
                <p className="text-muted-foreground">
                  ZenVault uses AES-256 encryption, the same standard trusted by
                  governments and financial institutions worldwide.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full bg-green-500/20 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  </div>
                  <span>Local storage for maximum privacy</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full bg-green-500/20 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  </div>
                  <span>Secure file sharing with granular permissions</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full bg-green-500/20 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  </div>
                  <span>Two-factor authentication</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full bg-green-500/20 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  </div>
                  <span>Regular security audits</span>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 h-24 w-24 bg-zen-blue/10 rounded-full blur-xl"></div>
            <div className="absolute -bottom-8 -left-8 h-32 w-32 bg-zen-purple/10 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Sample connection points for the map
const connectionPoints = [
  {
    start: { lat: 40.7128, lng: -74.006, label: "New York" }, // New York
    end: { lat: 51.5074, lng: -0.1278, label: "London" }, // London
  },
  {
    start: { lat: 35.6762, lng: 139.6503, label: "Tokyo" }, // Tokyo
    end: { lat: 1.3521, lng: 103.8198, label: "Singapore" }, // Singapore
  },
  {
    start: { lat: -33.8688, lng: 151.2093, label: "Sydney" }, // Sydney
    end: { lat: 19.076, lng: 72.8777, label: "Mumbai" }, // Mumbai
  },
  {
    start: { lat: 37.7749, lng: -122.4194, label: "San Francisco" }, // San Francisco
    end: { lat: 55.7558, lng: 37.6173, label: "Moscow" }, // Moscow
  },
];

export function SecurityInfrastructure() {
  return (
    <section className="py-16 bg-slate-50 dark:bg-slate-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Global Security Infrastructure
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            ZenVault's secure infrastructure spans the globe, ensuring your data
            is protected with military-grade encryption and redundant systems.
          </p>
        </div>

        <div className="mb-16">
          <WorldMap dots={connectionPoints} lineColor="#0ea5e9" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div className="p-6 bg-white dark:bg-slate-900 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-3">
              End-to-End Encryption
            </h3>
            <p className="text-muted-foreground">
              Your data is encrypted before it leaves your device and can only
              be decrypted with your unique key.
            </p>
          </div>
          <div className="p-6 bg-white dark:bg-slate-900 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-3">
              Zero-Knowledge Architecture
            </h3>
            <p className="text-muted-foreground">
              We can't access your data even if we wanted to. Your secrets
              remain yours alone.
            </p>
          </div>
          <div className="p-6 bg-white dark:bg-slate-900 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-3">
              Biometric Authentication
            </h3>
            <p className="text-muted-foreground">
              Add an extra layer of security with fingerprint or face
              recognition on supported devices.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
