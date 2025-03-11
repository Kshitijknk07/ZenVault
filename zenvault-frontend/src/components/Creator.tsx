import { Github, Linkedin, Code, Star } from 'lucide-react';

const Creator = () => {
  return (
    <div id="creator" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-accent/5 via-transparent to-transparent opacity-60"></div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-accent/10 text-accent mb-6 text-sm font-medium">
            <Code className="h-4 w-4 mr-2" />
            <span>Created By</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-6">
            Meet the <span className="text-gradient">Developer</span>
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-soft-xl p-8 sm:p-10 border border-border transition-all duration-300 hover:shadow-accent-glow animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div className="flex flex-col items-center md:items-start">
                <div className="relative w-48 h-48 sm:w-56 sm:h-56 mb-6">
                  <div className="absolute inset-0 bg-accent/10 rounded-full animate-pulse-slow"></div>
                  <img
                    className="rounded-full object-cover w-full h-full ring-4 ring-white shadow-lg relative z-10"
                    src="https://avatars.githubusercontent.com/u/Kshitijknk07"
                    alt="KSHITIJ"
                    onError={(e) => {
                      e.currentTarget.src = 'https://ui-avatars.com/api/?name=KSHITIJ&background=6366f1&color=fff&size=256';
                    }}
                  />
                  <div className="absolute -bottom-2 -right-2 bg-gradient-accent rounded-full p-2 shadow-accent-sm z-20">
                    <div className="text-white font-bold text-lg">KS</div>
                  </div>
                </div>

                <div className="flex space-x-4 mt-4 mb-6 md:mb-0">
                  <a
                    href="https://github.com/Kshitijknk07"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground hover:text-accent transition-all duration-200 transform hover:scale-110 bg-secondary hover:bg-secondary/80 p-2 rounded-full"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/kshitij-narayan-kulkarni-784a4a259/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground hover:text-accent transition-all duration-200 transform hover:scale-110 bg-secondary hover:bg-secondary/80 p-2 rounded-full"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                </div>
              </div>

              <div>
                <div className="flex items-center mb-4">
                  <h3 className="text-2xl sm:text-3xl font-bold mr-3">KSHITIJ</h3>
                  <div className="px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium">
                    Full Stack Developer
                  </div>
                </div>

                <p className="text-muted-foreground mb-6 leading-relaxed">
                  A passionate developer with a love for creating elegant solutions to complex problems.
                  Specializing in modern web technologies and secure applications, I'm dedicated to building
                  software that makes a difference. ZenVault is one of my projects that showcases the
                  intersection of security and user experience.
                </p>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-secondary/50 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <Code className="h-4 w-4 text-accent mr-2" />
                      <span className="text-sm font-medium">Tech Stack</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {['React', 'Node.js', 'TypeScript', 'Tailwind CSS'].map((tech, i) => (
                        <span key={i} className="px-2 py-1 bg-white/50 rounded text-xs font-medium">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-secondary/50 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <Star className="h-4 w-4 text-accent mr-2" />
                      <span className="text-sm font-medium">Specialties</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {['UI/UX', 'Security', 'Cloud', 'API Design'].map((specialty, i) => (
                        <span key={i} className="px-2 py-1 bg-white/50 rounded text-xs font-medium">
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <p className="text-muted-foreground mb-4">Want to contribute to ZenVault?</p>
            <a
              href="https://github.com/Kshitijknk07/ZenVault"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 border border-border hover:border-accent/30 text-base font-medium rounded-lg bg-white/50 backdrop-blur-sm hover:bg-white/80 transition-all duration-300"
            >
              <Github className="h-5 w-5 mr-2" />
              View on GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Creator;