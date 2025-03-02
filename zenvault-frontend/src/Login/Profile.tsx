import { useUser } from "@clerk/clerk-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Badge } from "../components/ui/badge";
import { Skeleton } from "../components/ui/skeleton";
import { Mail, MapPin, Calendar } from "lucide-react";
import { ReactNode } from "react";

const Profile = () => {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded) {
    return <LoadingProfile />;
  }

  if (!isSignedIn) {
    return (
      <Card className="max-w-md mx-auto mt-8">
        <CardHeader className="text-center">
          <CardTitle>Not Signed In</CardTitle>
          <CardDescription>Please sign in to view your profile</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const memberSince = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "N/A";

  const role = user?.publicMetadata?.role as string || "N/A";
  const plan = user?.publicMetadata?.plan as string || "N/A";
  const location = user?.publicMetadata?.location as string || "N/A";
  const bio = user?.publicMetadata?.bio as string || "N/A";

  const firstName = user.firstName ?? undefined;
  const lastName = user.lastName ?? undefined;

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-3xl mx-auto">
        <CardHeader className="pb-2">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={user.imageUrl} alt={`${user.firstName} ${user.lastName}`} />
              <AvatarFallback>{getInitials(firstName, lastName)}</AvatarFallback>
            </Avatar>
            <div className="space-y-1 text-center md:text-left">
              <CardTitle className="text-2xl font-bold">
                {user.firstName} {user.lastName}
              </CardTitle>
              <CardDescription className="flex items-center justify-center md:justify-start gap-1">
                <Mail className="h-4 w-4" />
                {user.emailAddresses[0].emailAddress}
              </CardDescription>
              {user.username && <CardDescription>@{user.username}</CardDescription>}
              <div className="flex flex-wrap gap-2 justify-center md:justify-start mt-2">
                {role && <Badge variant="outline">{role}</Badge>}
                {plan && <Badge>{plan}</Badge>}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <ProfileInfoItem
              icon={<Calendar className="h-4 w-4 text-muted-foreground" />}
              label="Member since"
              value={memberSince}
            />
            {user.phoneNumbers && user.phoneNumbers.length > 0 && (
              <ProfileInfoItem
                icon={<Mail className="h-4 w-4 text-muted-foreground" />}
                label="Phone"
                value={user.phoneNumbers[0].phoneNumber}
              />
            )}
            {location && (
              <ProfileInfoItem
                icon={<MapPin className="h-4 w-4 text-muted-foreground" />}
                label="Location"
                value={location}
              />
            )}
          </div>

          {bio && (
            <div className="mt-6">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Bio</h3>
              <p className="text-sm">{bio}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

interface ProfileInfoItemProps {
  icon: ReactNode;
  label: string;
  value: string | number;
}

const ProfileInfoItem = ({ icon, label, value }: ProfileInfoItemProps) => (
  <div className="flex items-start gap-2">
    {icon}
    <div>
      <p className="text-sm font-medium text-muted-foreground">{label}</p>
      <p className="text-sm">{value}</p>
    </div>
  </div>
);

const LoadingProfile = () => (
  <div className="container mx-auto px-4 py-8">
    <Card className="max-w-3xl mx-auto">
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
        <Skeleton className="h-24 w-full mt-6" />
      </CardContent>
    </Card>
  </div>
);

const getInitials = (firstName: string | undefined, lastName: string | undefined): string => {
  return `${firstName?.charAt(0) || ""}${lastName?.charAt(0) || ""}`;
};

export default Profile;