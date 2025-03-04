import { Shield, Lock, Database } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left animate-fade-in">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl animate-slide-down">
                <span className="block mb-2">Secure cloud storage</span>
                <span className="block text-indigo-600 animate-slide-up" style={{ animationDelay: '0.2s' }}>for your digital life</span>
              </h1>
              <p className="mt-6 text-lg text-gray-600 sm:mt-8 sm:text-xl sm:max-w-xl sm:mx-auto md:mt-8 md:text-2xl lg:mx-0 leading-relaxed animate-fade-in" style={{ animationDelay: '0.4s' }}>
                Experience peace of mind with ZenVault's enterprise-grade security. Store, share, and collaborate on your files with unparalleled protection and intuitive simplicity.
              </p>
              <div className="mt-8 sm:mt-10 flex justify-center lg:justify-start animate-slide-up" style={{ animationDelay: '0.6s' }}>
                <div className="rounded-md shadow hover-lift">
                  <a
                    href="#"
                    className="w-full flex items-center justify-center px-10 py-4 border border-transparent text-lg font-semibold rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-all duration-200 md:py-5 md:text-xl md:px-16"
                  >
                    Get started free
                  </a>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <div className="h-56 w-full bg-white sm:h-72 md:h-96 lg:w-full lg:h-full flex items-center justify-center">
          <div className="grid grid-cols-2 gap-6 p-8">
            <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm flex flex-col items-center transform transition-all duration-300 hover:scale-105 hover:border-indigo-200 hover:shadow-md animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="bg-indigo-50 p-3 rounded-lg mb-4">
                <Shield className="h-8 w-8 text-indigo-600" />
              </div>
              <span className="text-gray-900 font-medium text-base">Advanced Security</span>
              <span className="text-gray-500 text-sm mt-1 text-center">Military-grade protection</span>
            </div>
            <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm flex flex-col items-center transform transition-all duration-300 hover:scale-105 hover:border-indigo-200 hover:shadow-md animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="bg-indigo-50 p-3 rounded-lg mb-4">
                <Lock className="h-8 w-8 text-indigo-600" />
              </div>
              <span className="text-gray-900 font-medium text-base">End-to-End Encryption</span>
              <span className="text-gray-500 text-sm mt-1 text-center">Your data, your keys</span>
            </div>
            <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm flex flex-col items-center transform transition-all duration-300 hover:scale-105 hover:border-indigo-200 hover:shadow-md animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="bg-indigo-50 p-3 rounded-lg mb-4">
                <Database className="h-8 w-8 text-indigo-600" />
              </div>
              <span className="text-gray-900 font-medium text-base">Unlimited Storage</span>
              <span className="text-gray-500 text-sm mt-1 text-center">Never run out of space</span>
            </div>
            <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm flex flex-col items-center transform transition-all duration-300 hover:scale-105 hover:border-indigo-200 hover:shadow-md animate-fade-in" style={{ animationDelay: '0.5s' }}>
              <div className="bg-indigo-50 p-3 rounded-lg mb-4">
                <div className="h-8 w-8 flex items-center justify-center text-indigo-600 text-xl font-bold">
                  24/7
                </div>
              </div>
              <span className="text-gray-900 font-medium text-base">Always Available</span>
              <span className="text-gray-500 text-sm mt-1 text-center">Access anywhere, anytime</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;