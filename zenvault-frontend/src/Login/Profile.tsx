import { useUser } from "@clerk/clerk-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Badge } from "../components/ui/badge";
import { Skeleton } from "../components/ui/skeleton";
import { Mail, MapPin, Calendar, HardDrive, FileText, Settings, ArrowLeft, Shield } from "lucide-react";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

const Profile = () => {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded) {
    return <LoadingProfile />;
  }

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
          <CardContent className="flex flex-col items-center gap-4">
            <Link
              to="/login"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-accent shadow-accent-sm hover:shadow-accent-glow transition-all duration-300"
            >
              Sign In
            </Link>
            <Link
              to="/"
              className="inline-flex items-center text-accent hover:text-accent/80 transition-all duration-200"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to home
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const memberSince = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "N/A";

  const role = user?.publicMetadata?.role as string || "Free User";
  const plan = user?.publicMetadata?.plan as string || "Basic";
  const location = user?.publicMetadata?.location as string || "Not specified";
  const bio = user?.publicMetadata?.bio as string || "No bio provided";

  const firstName = user.firstName ?? undefined;
  const lastName = user.lastName ?? undefined;

  return (
    <div className="container mx-auto px-4 py-12 relative">
      <div className="absolute inset-0 bg-gradient-radial from-accent/5 to-transparent opacity-60 -z-10"></div>

      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <Link to="/" className="inline-flex items-center text-accent hover:text-accent/80 transition-all duration-200">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to home
          </Link>

          <button className="inline-flex items-center px-4 py-2 bg-secondary hover:bg-secondary/80 rounded-lg text-sm font-medium transition-all duration-200">
            <Settings className="h-4 w-4 mr-2" />
            Account Settings
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="bg-white/90 backdrop-blur-sm shadow-soft-xl border-border lg:col-span-2">
            <CardHeader className="pb-2">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-accent/10 rounded-full animate-pulse-slow -z-10"></div>
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
                <ProfileInfoItem
                  icon={<Calendar className="h-4 w-4 text-accent" />}
                  label="Member since"
                  value={memberSince}
                />
                {user.phoneNumbers && user.phoneNumbers.length > 0 && (
                  <ProfileInfoItem
                    icon={<Mail className="h-4 w-4 text-accent" />}
                    label="Phone"
                    value={user.phoneNumbers[0].phoneNumber}
                  />
                )}
                {location && (
                  <ProfileInfoItem
                    icon={<MapPin className="h-4 w-4 text-accent" />}
                    label="Location"
                    value={location}
                  />
                )}
              </div>

              <div className="mt-8 pt-6 border-t border-border">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Bio</h3>
                <p className="text-muted-foreground">{bio}</p>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-8">
            <Card className="bg-white/90 backdrop-blur-sm shadow-sm border-border">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center">
                  <HardDrive className="h-5 w-5 mr-2 text-accent" />
                  Storage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Used</span>
                      <span className="font-medium">1.2 GB of 5 GB</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-accent w-[24%] rounded-full"></div>
                    </div>
                  </div>

                  <button className="w-full px-4 py-2 mt-4 bg-secondary hover:bg-secondary/80 rounded-lg text-sm font-medium transition-all duration-200">
                    Upgrade Storage
                  </button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm shadow-sm border-border">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-accent" />
                  Recent Files
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: 'Project Proposal.pdf', date: '2 days ago', size: '2.4 MB' },
                    { name: 'Meeting Notes.docx', date: '1 week ago', size: '1.1 MB' },
                    { name: 'Budget 2023.xlsx', date: '2 weeks ago', size: '3.7 MB' },
                  ].map((file, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-colors duration-200 cursor-pointer">
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 text-accent mr-3" />
                        <div>
                          <p className="text-sm font-medium">{file.name}</p>
                          <p className="text-xs text-muted-foreground">{file.date}</p>
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground">{file.size}</span>
                    </div>
                  ))}

                  <button className="w-full px-4 py-2 mt-2 text-accent hover:text-accent/80 text-sm font-medium transition-colors duration-200">
                    View All Files
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

interface ProfileInfoItemProps {
  icon: ReactNode;
  label: string;
  value: string | number;
}

const ProfileInfoItem = ({ icon, label, value }: ProfileInfoItemProps) => (
  <div className="flex items-start gap-3 bg-secondary/30 p-4 rounded-lg">
    {icon}
    <div>
      <p className="text-sm font-medium text-muted-foreground">{label}</p>
      <p className="text-sm font-medium">{value}</p>
    </div>
  </div>
);

const LoadingProfile = () => (
  <div className="container mx-auto px-4 py-12">
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <Skeleton className="h-8 w-24" />
        <Skeleton className="h-10 w-40" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 shadow-soft-xl">
          <CardHeader className="pb-2">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <Skeleton className="h-24 w-24 rounded-full" />
              <div className="space-y-3 w-full max-w-md">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-4 w-64" />
                <Skeleton className="h-4 w-32" />
                <div className="flex gap-2 mt-2">
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-6 w-16" />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <Skeleton className="h-16 w-full rounded-lg" />
              <Skeleton className="h-16 w-full rounded-lg" />
            </div>
            <div className="mt-8 pt-6 border-t border-border">
              <Skeleton className="h-4 w-24 mb-4" />
              <Skeleton className="h-20 w-full" />
            </div>
          </CardContent>
        </Card>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-2 w-full mb-4" />
              <Skeleton className="h-10 w-full" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Skeleton className="h-16 w-full rounded-lg" />
                <Skeleton className="h-16 w-full rounded-lg" />
                <Skeleton className="h-16 w-full rounded-lg" />
                <Skeleton className="h-10 w-full" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  </div>
);

const getInitials = (firstName: string | undefined, lastName: string | undefined): string => {
  return `${firstName?.charAt(0) || ""}${lastName?.charAt(0) || ""}`;
};

export default Profile;