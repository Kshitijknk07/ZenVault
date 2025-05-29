import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile, logoutUser } from "../api/auth";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await getProfile();
        setUser(profile);
      } catch (error) {
        navigate("/auth");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate("/auth");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <nav className="bg-slate-800/50 backdrop-blur-lg border-b border-slate-700">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-white text-2xl font-bold">
              Zen<span className="text-emerald-400">Vault</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-slate-300">Welcome, {user?.username}</span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-emerald-400 border border-emerald-400 rounded-lg hover:bg-emerald-400 hover:text-slate-900 transition-all duration-300"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-6 py-8">
        <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 border border-slate-700">
          <h1 className="text-3xl font-bold text-white mb-6">Dashboard</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-700">
              <h3 className="text-xl font-semibold text-emerald-400 mb-2">
                Storage Used
              </h3>
              <p className="text-3xl font-bold text-white">0 GB</p>
              <p className="text-slate-400 mt-2">of 10 GB</p>
            </div>

            <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-700">
              <h3 className="text-xl font-semibold text-emerald-400 mb-2">
                Files
              </h3>
              <p className="text-3xl font-bold text-white">0</p>
              <p className="text-slate-400 mt-2">files uploaded</p>
            </div>

            <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-700">
              <h3 className="text-xl font-semibold text-emerald-400 mb-2">
                Last Login
              </h3>
              <p className="text-3xl font-bold text-white">
                {new Date().toLocaleDateString()}
              </p>
              <p className="text-slate-400 mt-2">from {user?.email}</p>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold text-white mb-4">
              Recent Activity
            </h2>
            <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-700">
              <p className="text-slate-400 text-center">No recent activity</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
