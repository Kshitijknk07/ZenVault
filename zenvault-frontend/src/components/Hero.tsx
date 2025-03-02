import { Shield, Lock, Database } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block">Secure cloud storage</span>
                <span className="block text-indigo-600">for your digital life</span>
              </h1>
              <p className="mt-3 text-base text-gray-600 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                ZenVault provides a secure, intuitive, and powerful platform for storing, sharing, and collaborating on your files. Your data, your control, our protection.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <a
                    href="#"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                  >
                    Get started
                  </a>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <a
                    href="#"
                    className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
                  >
                    Learn more
                  </a>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <div className="h-56 w-full bg-white sm:h-72 md:h-96 lg:w-full lg:h-full flex items-center justify-center">
          <div className="grid grid-cols-2 gap-4 p-8">
            <div className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm flex flex-col items-center">
              <Shield className="h-12 w-12 text-indigo-600 mb-2" />
              <span className="text-gray-700 text-sm">Advanced Security</span>
            </div>
            <div className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm flex flex-col items-center">
              <Lock className="h-12 w-12 text-indigo-600 mb-2" />
              <span className="text-gray-700 text-sm">End-to-End Encryption</span>
            </div>
            <div className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm flex flex-col items-center">
              <Database className="h-12 w-12 text-indigo-600 mb-2" />
              <span className="text-gray-700 text-sm">Unlimited Storage</span>
            </div>
            <div className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm flex flex-col items-center">
              <div className="h-12 w-12 flex items-center justify-center text-indigo-600 mb-2 text-2xl font-bold">
                24/7
              </div>
              <span className="text-gray-700 text-sm">Always Available</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;