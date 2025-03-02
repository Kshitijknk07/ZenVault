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
    <div id="features" className="py-16 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-indigo-400 font-semibold tracking-wide uppercase">Features</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
            Everything you need in one place
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-400 lg:mx-auto">
            ZenVault combines security, convenience, and powerful features to give you the best cloud storage experience.
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="bg-gray-900 p-6 rounded-lg shadow-lg border border-gray-700 hover:border-indigo-500 transition-all duration-300">
                <div>
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-lg leading-6 font-medium text-white">{feature.name}</h3>
                  <p className="mt-2 text-base text-gray-400">{feature.description}</p>
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