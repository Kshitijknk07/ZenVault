import { Github, Linkedin } from 'lucide-react';

const Creator = () => {
  return (
    <div id="creator" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center animate-fade-in">
          <h2 className="text-sm text-indigo-600 font-bold tracking-widest uppercase">Created By</h2>
          <p className="mt-4 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl leading-tight">
            Meet the Developer
          </p>
        </div>

        <div className="mt-20 max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 transition-all duration-300 hover:shadow-xl animate-fade-in">
            <div className="flex flex-col items-center">
              <div className="relative w-60 h-60 sm:w-72 sm:h-72 mb-8">
                <img 
                  className="rounded-full object-cover w-full h-full ring-4 ring-indigo-50 shadow-lg" 
                  src="../../dist/assets/anime1.png" 
                  alt="KSHITIJ" 
                />
                <div className="absolute -bottom-2 -right-2 bg-indigo-600 rounded-full p-2 shadow-lg">
                  <div className="text-white font-bold text-lg">KS</div>
                </div>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">KSHITIJ</h3>
              <p className="text-xl text-indigo-600 mb-6">Full Stack Developer</p>
              <p className="text-gray-600 text-center max-w-2xl mb-8 text-lg leading-relaxed">
                A passionate developer with a love for creating elegant solutions to complex problems. 
                Specializing in modern web technologies and secure applications, I'm dedicated to building 
                software that makes a difference. ZenVault is one of my projects that showcases the 
                intersection of security and user experience.
              </p>
              <div className="flex space-x-6">
                <a 
                  href="https://github.com/Kshitijknk07" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-indigo-600 transition-all duration-200 transform hover:scale-110"
                >
                  <Github className="h-7 w-7" />
                </a>
                <a 
                  href="https://www.linkedin.com/in/kshitij-narayan-kulkarni-784a4a259/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-indigo-600 transition-all duration-200 transform hover:scale-110"
                >
                  <Linkedin className="h-7 w-7" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Creator;