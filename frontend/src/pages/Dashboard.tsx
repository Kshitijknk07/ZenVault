import { useUser, useClerk } from "@clerk/clerk-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileIcon, FolderIcon, LogOutIcon, UploadIcon } from "lucide-react";
import { FileManager } from "@/components/FileManager";
import { useState, useEffect } from "react";

const Dashboard = () => {
  const { user } = useUser();
  const { signOut } = useClerk();
  const [usage, setUsage] = useState({ used: 0, total: 0 });

  const handleLogout = () => {
    signOut();
  };

  useEffect(() => {
    if (user?.id) {
      fetch("/api/storage/usage", {
        headers: {
          "X-User-ID": user.id,
        },
      })
        .then((res) => res.json())
        .then((data) => setUsage(data));
    }
  }, [user]);

  return (
    <div className="container mx-auto p-4">
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">
            Welcome, {user?.firstName || user?.username || "User"}!
          </h1>
          <p className="text-muted-foreground">
            Manage your files securely with ZenVault
          </p>
        </div>
        <Button
          variant="outline"
          className="flex items-center"
          onClick={handleLogout}
        >
          <LogOutIcon className="mr-2 h-4 w-4" /> Logout
        </Button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Storage</CardTitle>
            <CardDescription>Your storage usage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-2 bg-secondary rounded-full mb-2">
              <div
                className="h-full bg-primary rounded-full"
                style={{ width: `${(usage.used / usage.total) * 100}%` }}
              />
            </div>
            <p className="text-sm text-muted-foreground">
              {usage.used} MB of {usage.total} MB used
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Files</CardTitle>
            <CardDescription>Your uploaded files</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center">
            <FileIcon className="mr-2 h-5 w-5 text-primary" />
            <span className="text-2xl font-bold">12</span>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Folders</CardTitle>
            <CardDescription>Your created folders</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center">
            <FolderIcon className="mr-2 h-5 w-5 text-primary" />
            <span className="text-2xl font-bold">3</span>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-wrap gap-4 mb-8">
        <Button className="flex items-center">
          <UploadIcon className="mr-2 h-4 w-4" /> Upload File
        </Button>
        <Button variant="outline" className="flex items-center">
          <FolderIcon className="mr-2 h-4 w-4" /> New Folder
        </Button>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Recent Files</h2>
        <FileManager />
      </div>
    </div>
  );
};

export default Dashboard;
