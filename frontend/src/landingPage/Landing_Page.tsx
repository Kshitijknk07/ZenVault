import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      <nav className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="text-white text-3xl font-bold tracking-tight">
            Zen<span className="text-emerald-400">Vault</span>
          </div>
          <div className="space-x-4">
            <button
              onClick={() => navigate("/auth")}
              className="px-6 py-2.5 text-emerald-400 border border-emerald-400 rounded-lg hover:bg-emerald-400 hover:text-slate-900 transition-all duration-300 font-medium"
            >
              Sign In
            </button>
            <button
              onClick={() => navigate("/auth")}
              className="px-6 py-2.5 bg-emerald-400 text-slate-900 rounded-lg hover:bg-emerald-500 transition-all duration-300 font-medium"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-6 h-[calc(100vh-8rem)] flex items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="text-left">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Secure Your Digital Life with{" "}
              <span className="text-emerald-400">ZenVault</span>
            </h1>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              Experience enterprise-grade security for your files. Store,
              organize, and protect your digital assets with confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate("/auth")}
                className="px-8 py-4 bg-emerald-400 text-slate-900 rounded-lg text-lg font-semibold hover:bg-emerald-500 transition-all duration-300 shadow-lg shadow-emerald-400/20"
              >
                Start Free Trial
              </button>
              <button
                onClick={() => navigate("/auth")}
                className="px-8 py-4 text-emerald-400 border border-emerald-400 rounded-lg text-lg font-semibold hover:bg-emerald-400 hover:text-slate-900 transition-all duration-300"
              >
                Learn More
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6 border border-slate-700 hover:border-emerald-400/50 transition-all duration-300 group">
              <div className="text-4xl mb-4 text-emerald-400 group-hover:scale-110 transition-transform duration-300">
                🔒
              </div>
              <h3 className="text-lg font-semibold mb-2 text-emerald-400">
                End-to-End Encryption
              </h3>
              <p className="text-slate-300 text-sm">
                Military-grade security for your files
              </p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6 border border-slate-700 hover:border-emerald-400/50 transition-all duration-300 group">
              <div className="text-4xl mb-4 text-emerald-400 group-hover:scale-110 transition-transform duration-300">
                ⚡
              </div>
              <h3 className="text-lg font-semibold mb-2 text-emerald-400">
                Lightning Fast
              </h3>
              <p className="text-slate-300 text-sm">
                Instant upload and download speeds
              </p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6 border border-slate-700 hover:border-emerald-400/50 transition-all duration-300 group">
              <div className="text-4xl mb-4 text-emerald-400 group-hover:scale-110 transition-transform duration-300">
                🔄
              </div>
              <h3 className="text-lg font-semibold mb-2 text-emerald-400">
                Seamless Sync
              </h3>
              <p className="text-slate-300 text-sm">
                Access files from any device
              </p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6 border border-slate-700 hover:border-emerald-400/50 transition-all duration-300 group">
              <div className="text-4xl mb-4 text-emerald-400 group-hover:scale-110 transition-transform duration-300">
                🛡️
              </div>
              <h3 className="text-lg font-semibold mb-2 text-emerald-400">
                Advanced Security
              </h3>
              <p className="text-slate-300 text-sm">
                Multi-factor authentication
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
