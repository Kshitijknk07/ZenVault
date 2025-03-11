import { Shield, Lock, Database, Clock, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative overflow-hidden pt-20 pb-16 sm:pb-24 lg:pb-32 xl:pb-40">
      <div className="absolute inset-0 z-0 bg-gradient-radial from-accent/5 to-transparent"></div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6 xl:col-span-5 flex flex-col justify-center">
            <div className="animate-fade-in">
              <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-accent/10 text-accent mb-6 text-sm font-medium">
                <Sparkles className="h-4 w-4 mr-2" />
                <span>Secure. Simple. Seamless.</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight animate-slide-down">
                <span className="block mb-2">Secure cloud storage</span>
                <span className="block text-gradient animate-slide-up" style={{ animationDelay: '0.2s' }}>for your digital life</span>
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl animate-fade-in" style={{ animationDelay: '0.4s' }}>
                Experience peace of mind with ZenVault's enterprise-grade security. Store, share, and collaborate on your files with unparalleled protection and intuitive simplicity.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row gap-4 animate-slide-up" style={{ animationDelay: '0.6s' }}>
                <Link
                  to="/signup"
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-accent shadow-accent-sm hover:shadow-accent-glow transition-all duration-300"
                >
                  Get started free
                </Link>
                <a
                  href="#features"
                  className="inline-flex items-center justify-center px-6 py-3 border border-border hover:border-accent/30 text-base font-medium rounded-lg bg-white/50 backdrop-blur-sm hover:bg-white/80 transition-all duration-300"
                >
                  Learn more
                </a>
              </div>

              <div className="mt-12 pt-6 border-t border-border">
                <p className="text-sm text-muted-foreground mb-3">Trusted by companies worldwide</p>
                <div className="flex flex-wrap gap-6 items-center opacity-70">
                  {['Acme Inc.', 'GlobalTech', 'FutureCorp', 'InnovateLabs'].map((company, i) => (
                    <div key={i} className="text-lg font-semibold tracking-tight">{company}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 lg:mt-0 lg:col-span-6 xl:col-span-7">
            <div className="relative">
              <div className="absolute -top-10 -right-10 w-72 h-72 bg-accent/5 rounded-full filter blur-3xl"></div>
              <div className="absolute -bottom-8 -left-8 w-72 h-72 bg-accent/10 rounded-full filter blur-3xl"></div>

              <div className="relative grid grid-cols-2 gap-6 sm:gap-8 p-4">
                <div className="glass-card p-6 rounded-xl flex flex-col items-center transform transition-all duration-300 hover:scale-105 hover:shadow-soft-xl animate-fade-in animate-float" style={{ animationDelay: '0.2s' }}>
                  <div className="bg-accent/10 p-4 rounded-lg mb-4">
                    <Shield className="h-8 w-8 text-accent" />
                  </div>
                  <span className="text-foreground font-semibold text-lg">Advanced Security</span>
                  <span className="text-muted-foreground text-sm mt-2 text-center">Military-grade protection</span>
                </div>

                <div className="glass-card p-6 rounded-xl flex flex-col items-center transform transition-all duration-300 hover:scale-105 hover:shadow-soft-xl animate-fade-in animate-float" style={{ animationDelay: '0.3s', animationDuration: '7s' }}>
                  <div className="bg-accent/10 p-4 rounded-lg mb-4">
                    <Lock className="h-8 w-8 text-accent" />
                  </div>
                  <span className="text-foreground font-semibold text-lg">End-to-End Encryption</span>
                  <span className="text-muted-foreground text-sm mt-2 text-center">Your data, your keys</span>
                </div>

                <div className="glass-card p-6 rounded-xl flex flex-col items-center transform transition-all duration-300 hover:scale-105 hover:shadow-soft-xl animate-fade-in animate-float" style={{ animationDelay: '0.4s', animationDuration: '5s' }}>
                  <div className="bg-accent/10 p-4 rounded-lg mb-4">
                    <Database className="h-8 w-8 text-accent" />
                  </div>
                  <span className="text-foreground font-semibold text-lg">Unlimited Storage</span>
                  <span className="text-muted-foreground text-sm mt-2 text-center">Never run out of space</span>
                </div>

                <div className="glass-card p-6 rounded-xl flex flex-col items-center transform transition-all duration-300 hover:scale-105 hover:shadow-soft-xl animate-fade-in animate-float" style={{ animationDelay: '0.5s', animationDuration: '8s' }}>
                  <div className="bg-accent/10 p-4 rounded-lg mb-4">
                    <Clock className="h-8 w-8 text-accent" />
                  </div>
                  <span className="text-foreground font-semibold text-lg">Always Available</span>
                  <span className="text-muted-foreground text-sm mt-2 text-center">Access anywhere, anytime</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;