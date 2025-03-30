import { Button } from "@/components/ui/button";
import { SparklesCore } from "@/components/ui/sparkles";
import {
  ArrowRight,
  Cloud,
  ShieldCheck,
  Folder,
  Star,
  Clock,
  Upload,
  Settings,
} from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-24 md:pt-32 pb-16">
      {/* Spotlight effect */}
      <div className="absolute -top-40 left-0 right-0 pointer-events-none">
        <div className="relative h-[800px] w-full">
          <div className="absolute inset-0 z-[-1] h-full w-full bg-gradient-to-r from-zen-blue via-zen-purple to-zen-teal opacity-20 blur-[100px] dark:opacity-10 animate-spotlight" />
        </div>
      </div>

      {/* Sparkles effect */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <SparklesCore
          id="heroSparkles"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleColor="#ffffff"
          particleDensity={70}
          speed={0.5}
          className="w-full h-full"
        />
      </div>

      <div className="relative container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight max-w-3xl animate-fade-in">
            Secure Your Digital World with{" "}
            <span className="gradient-text">ZenVault</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-[700px] animate-fade-in">
            A cloud storage platform that combines uncompromising security with
            intuitive design. Store, sync, and share files with confidence.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 pt-6 animate-fade-in">
            <Button size="lg" className="gap-1">
              Get Started Free <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </div>
          <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground animate-fade-in">
            <ShieldCheck className="h-4 w-4 text-accent" />
            <span>Your data is always encrypted and secure</span>
          </div>
        </div>

        {/* Dashboard Preview */}
        <div className="mt-16 md:mt-24 max-w-5xl mx-auto relative z-20 animate-fade-in">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-zen-blue to-zen-purple opacity-20 blur-lg rounded-xl"></div>
            <div className="relative glass-card rounded-2xl shadow-2xl border border-white/10 dark:border-white/5 overflow-hidden p-4">
              {/* Dashboard Header */}
              <div className="flex justify-between items-center mb-6 p-2">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-md bg-zen-blue/90 flex items-center justify-center">
                    <Cloud className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-semibold text-xl">ZenVault Dashboard</h3>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    <Upload className="h-4 w-4 mr-1" /> Upload
                  </Button>
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Dashboard Content */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {/* Storage Stats */}
                <div className="bg-background/50 backdrop-blur-sm p-4 rounded-xl border border-white/10">
                  <h4 className="text-sm font-medium mb-2">Storage Used</h4>
                  <div className="w-full h-2 bg-muted rounded-full mb-2">
                    <div className="h-full w-[35%] bg-gradient-to-r from-zen-blue to-zen-purple rounded-full"></div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    3.5 GB of 10 GB
                  </p>
                </div>

                {/* Quick Access */}
                <div className="bg-background/50 backdrop-blur-sm p-4 rounded-xl border border-white/10">
                  <h4 className="text-sm font-medium mb-2">Quick Access</h4>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" className="h-8 px-2">
                      <Star className="h-3 w-3 mr-1 text-amber-400" /> Favorites
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 px-2">
                      <Clock className="h-3 w-3 mr-1 text-zen-purple" /> Recent
                    </Button>
                  </div>
                </div>

                {/* Security Status */}
                <div className="bg-background/50 backdrop-blur-sm p-4 rounded-xl border border-white/10">
                  <h4 className="text-sm font-medium mb-2">Security Status</h4>
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-green-500/20 flex items-center justify-center">
                      <ShieldCheck className="h-3 w-3 text-green-500" />
                    </div>
                    <span className="text-xs">All files encrypted</span>
                  </div>
                </div>
              </div>

              {/* Files List */}
              <div className="bg-background/30 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden">
                <div className="flex justify-between items-center p-3 border-b border-white/5">
                  <h4 className="font-medium">Recent Files</h4>
                  <Button variant="ghost" size="sm" className="text-xs h-7">
                    View All
                  </Button>
                </div>
                <div className="divide-y divide-white/5">
                  {[
                    {
                      name: "Project Presentation.pdf",
                      type: "PDF",
                      size: "2.4 MB",
                      date: "Today",
                    },
                    {
                      name: "Financial Report Q2.xlsx",
                      type: "Excel",
                      size: "1.8 MB",
                      date: "Yesterday",
                    },
                    {
                      name: "Meeting Notes.docx",
                      type: "Word",
                      size: "0.5 MB",
                      date: "Jul 15, 2023",
                    },
                  ].map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 hover:bg-white/5 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded bg-zen-purple/20 flex items-center justify-center">
                          <Folder className="h-4 w-4 text-zen-purple" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{file.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {file.type} • {file.size}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {file.date}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <Cloud className="absolute -bottom-6 -right-6 h-12 w-12 text-zen-blue animate-float" />
          </div>
        </div>
      </div>
    </section>
  );
}
