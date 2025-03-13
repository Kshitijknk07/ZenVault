import { Github, Linkedin, Code, Star } from 'lucide-react';

const Creator = () => {
  return (
    <div id="creator" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-accent/5 via-transparent to-transparent opacity-60"></div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-accent/10 text-accent mb-6 text-sm font-medium">
            <Code className="h-4 w-4 mr-2" />
            <span>Created By</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-6">
            Meet the <span className="text-gradient">Developer</span>
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-soft-xl p-8 sm:p-10 border border-border transition-all duration-300 hover:shadow-accent-glow">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div className="flex flex-col items-center md:items-start">
                <div className="relative w-48 h-48 sm:w-56 sm:h-56 mb-6">
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

                <h3 className="text-2xl font-bold mb-2">Kshitij Narayan Kulkarni</h3>
                <p className="text-muted-foreground mb-6 text-center md:text-left">
                  A passionate developer dedicated to creating secure and user-friendly applications.
                </p>

                <div className="flex gap-4">
                  <a
                    href="https://github.com/Kshitijknk07"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center h-10 w-10 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                  <a
                    href="https://linkedin.com/in/kshitij-kumar-07"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center h-10 w-10 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold mb-3">About the Project</h4>
                  <p className="text-muted-foreground">
                    ZenVault is a secure cloud storage solution that prioritizes user privacy and data security. Built with modern technologies and best practices, it provides a seamless experience for storing and sharing files.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-3">Tech Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Express', 'PostgreSQL', 'Prisma'].map((tech, i) => (
                      <div key={i} className="px-3 py-1 rounded-full bg-secondary text-sm font-medium">
                        {tech}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-3">Features</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-center">
                      <Star className="h-4 w-4 mr-2 text-accent" />
                      End-to-end encryption
                    </li>
                    <li className="flex items-center">
                      <Star className="h-4 w-4 mr-2 text-accent" />
                      Real-time file synchronization
                    </li>
                    <li className="flex items-center">
                      <Star className="h-4 w-4 mr-2 text-accent" />
                      Secure file sharing
                    </li>
                    <li className="flex items-center">
                      <Star className="h-4 w-4 mr-2 text-accent" />
                      Cross-platform support
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Creator;