import { 
  Shield, 
  Share2, 
  HardDrive, 
  Smartphone, 
  History, 
  Lock 
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
    <div id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center animate-fade-in">
          <h2 className="text-sm text-indigo-600 font-bold tracking-widest uppercase">Powerful Features</h2>
          <p className="mt-4 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl leading-tight">
            Everything you need,<br className="hidden sm:block" /> all in one secure place
          </p>
          <p className="mt-6 max-w-2xl text-xl text-gray-600 lg:mx-auto leading-relaxed">
            Experience the perfect blend of security, convenience, and powerful features. ZenVault delivers enterprise-grade protection with consumer-friendly simplicity.
          </p>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 gap-y-8 gap-x-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-12">
            {features.map((feature, index) => (
              <div
                key={feature.name}
                className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:border-indigo-100 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div>
                  <div className="flex items-center justify-center h-14 w-14 rounded-xl bg-indigo-50 text-indigo-600 mb-6 transform transition-transform duration-300 group-hover:scale-110">
                    <feature.icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.name}</h3>
                  <p className="text-base text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;