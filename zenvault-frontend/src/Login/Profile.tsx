import { useUser } from "@clerk/clerk-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Badge } from "../components/ui/badge";
import { Mail, MapPin, Calendar, HardDrive, FileText, Settings, ArrowLeft, Shield } from "lucide-react";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

const Profile = () => {
  const { isSignedIn, user } = useUser();

  if (!isSignedIn) {
    return (
      <div className="container mx-auto px-4 py-16">
        <Card className="max-w-md mx-auto bg-white/90 backdrop-blur-sm shadow-soft-xl">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-accent text-white shadow-accent-sm">
                <Shield className="h-6 w-6" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">Not Signed In</CardTitle>
            <CardDescription>Please sign in to view your profile</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  const firstName = user.firstName || '';
  const lastName = user.lastName || '';
  const role = 'User';
  const plan = 'Free';

  const getInitials = (first: string, last: string) => {
    return `${first.charAt(0)}${last.charAt(0)}`.toUpperCase();
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <Link to="/" className="inline-flex items-center text-accent hover:text-accent/80 transition-all duration-200 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg shadow-sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to home
          </Link>
          <div className="flex items-center gap-4">
            <button className="inline-flex items-center text-accent hover:text-accent/80 transition-all duration-200 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg shadow-sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="bg-white/90 backdrop-blur-sm shadow-soft-xl border-border lg:col-span-2">
            <CardHeader className="pb-2">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <div className="relative">
                  <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
                    <AvatarImage src={user.imageUrl} alt={`${user.firstName} ${user.lastName}`} />
                    <AvatarFallback className="bg-accent text-white">{getInitials(firstName, lastName)}</AvatarFallback>
                  </Avatar>
                </div>
                <div className="space-y-1 text-center md:text-left">
                  <CardTitle className="text-2xl font-bold">
                    {user.firstName} {user.lastName}
                  </CardTitle>
                  <CardDescription className="flex items-center justify-center md:justify-start gap-1">
                    <Mail className="h-4 w-4 text-accent" />
                    {user.emailAddresses[0].emailAddress}
                  </CardDescription>
                  {user.username && <CardDescription>@{user.username}</CardDescription>}
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start mt-2">
                    {role && <Badge variant="outline" className="bg-secondary/50">{role}</Badge>}
                    {plan && <Badge className="bg-accent text-white">{plan}</Badge>}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="bg-secondary/50 p-6 rounded-lg">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-accent text-white shadow-accent-sm">
                      <HardDrive className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Storage Used</h4>
                      <p className="text-sm text-muted-foreground">2.5 GB / 10 GB</p>
                    </div>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div className="bg-accent h-2 rounded-full" style={{ width: '25%' }}></div>
                  </div>
                </div>

                <div className="bg-secondary/50 p-6 rounded-lg">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-accent text-white shadow-accent-sm">
                      <FileText className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Files</h4>
                      <p className="text-sm text-muted-foreground">156 files</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold">45</div>
                      <div className="text-sm text-muted-foreground">Documents</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">89</div>
                      <div className="text-sm text-muted-foreground">Images</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">22</div>
                      <div className="text-sm text-muted-foreground">Videos</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-border">
                <h4 className="font-semibold mb-4">Recent Activity</h4>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-4 p-4 bg-secondary/50 rounded-lg">
                      <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-accent/10 text-accent">
                        <FileText className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">Document {i}.pdf</p>
                        <p className="text-sm text-muted-foreground">Updated 2 hours ago</p>
                      </div>
                      <button className="text-accent hover:text-accent/80">
                        <Settings className="h-5 w-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Account Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Email</label>
                    <p className="text-sm text-muted-foreground">{user.emailAddresses[0].emailAddress}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Username</label>
                    <p className="text-sm text-muted-foreground">@{user.username || 'Not set'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Member since</label>
                    <p className="text-sm text-muted-foreground">March 2024</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Subscription</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-secondary/50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Free Plan</span>
                      <Badge variant="outline">Current</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">Basic features with 10GB storage</p>
                    <button className="w-full bg-accent text-white py-2 rounded-lg hover:bg-accent/90 transition-colors">
                      Upgrade Plan
                    </button>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <p>• 10GB storage</p>
                    <p>• Basic security</p>
                    <p>• Standard support</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;