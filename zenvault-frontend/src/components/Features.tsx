import {
  Shield,
  Share2,
  HardDrive,
  Smartphone,
  History,
  Lock,
  Zap,
  CheckCircle
} from 'lucide-react';

const features = [
  {
    name: 'Advanced Security',
    description: 'Your files are protected with military-grade encryption, ensuring your data remains private and secure.',
    icon: Shield,
  },
  {
    name: 'Easy Sharing',
    description: 'Share files and folders with anyone, even if they don\'t have a ZenVault account. Control permissions and access levels.',
    icon: Share2,
  },
  {
    name: 'Unlimited Storage',
    description: 'Never worry about running out of space. Store all your important files with our unlimited storage plans.',
    icon: HardDrive,
  },
  {
    name: 'Mobile Access',
    description: 'Access your files from anywhere with our mobile apps for iOS and Android. Your files are always at your fingertips.',
    icon: Smartphone,
  },
  {
    name: 'Version History',
    description: 'Track changes and restore previous versions of your files. Never lose important work again.',
    icon: History,
  },
  {
    name: 'End-to-End Encryption',
    description: 'Your files are encrypted before they leave your device and can only be decrypted by you or your authorized recipients.',
    icon: Lock,
  },
];

const Features = () => {
  return (
    <div id="features" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-accent/5 via-transparent to-transparent opacity-60"></div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-20 animate-fade-in">
          <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-accent/10 text-accent mb-6 text-sm font-medium">
            <Zap className="h-4 w-4 mr-2" />
            <span>Powerful Features</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-6">
            Everything you need,<br className="hidden sm:block" /> all in one <span className="text-gradient">secure place</span>
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience the perfect blend of security, convenience, and powerful features. ZenVault delivers enterprise-grade protection with consumer-friendly simplicity.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={feature.name}
              className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-sm border border-border hover:border-accent/20 transition-all duration-300 hover:shadow-soft-xl hover:-translate-y-1 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-center h-14 w-14 rounded-xl bg-accent/10 text-accent mb-6 transform transition-all duration-300 hover:scale-110 hover:shadow-accent-sm">
                  <feature.icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.name}</h3>
                <p className="text-muted-foreground leading-relaxed flex-grow">{feature.description}</p>

                <div className="mt-6 pt-4 border-t border-border">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 mr-2 text-accent" />
                    <span>Available on all plans</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 pt-16 border-t border-border">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h3 className="text-2xl sm:text-3xl font-bold mb-6">Ready for enterprise deployment</h3>
              <p className="text-muted-foreground mb-8">
                ZenVault is built from the ground up with enterprise needs in mind. Our platform scales seamlessly from individual users to organizations with thousands of employees.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  'Single Sign-On (SSO)',
                  'Admin Controls',
                  'Audit Logs',
                  'Custom Branding',
                  'API Access',
                  'Dedicated Support',
                  'Compliance Tools',
                  'Advanced Analytics'
                ].map((feature, i) => (
                  <div key={i} className="flex items-center">
                    <CheckCircle className="h-5 w-5 mr-3 text-accent" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative animate-fade-in">
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-accent/5 rounded-full filter blur-3xl"></div>
              <div className="relative bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-soft-xl border border-border">
                <div className="flex justify-between items-center mb-6">
                  <h4 className="text-xl font-bold">Enterprise Dashboard</h4>
                  <div className="px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium">
                    Premium
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="h-12 bg-secondary rounded-lg animate-pulse-slow"></div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="h-24 bg-secondary rounded-lg animate-pulse-slow" style={{ animationDelay: '0.1s' }}></div>
                    <div className="h-24 bg-secondary rounded-lg animate-pulse-slow" style={{ animationDelay: '0.2s' }}></div>
                    <div className="h-24 bg-secondary rounded-lg animate-pulse-slow" style={{ animationDelay: '0.3s' }}></div>
                  </div>
                  <div className="h-32 bg-secondary rounded-lg animate-pulse-slow" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;