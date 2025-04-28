import { useUser } from "@clerk/clerk-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Profile = () => {
  const { user } = useUser();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <div className="space-y-4 max-w-md">
        <div>
          <label className="block mb-1">Username</label>
          <Input value={user?.username || ""} readOnly />
        </div>
        <div>
          <label className="block mb-1">Email</label>
          <Input
            value={user?.primaryEmailAddress?.emailAddress || ""}
            readOnly
          />
        </div>
        <Button>Update Profile</Button>
      </div>
    </div>
  );
};
