import { useUser, useClerk } from "@clerk/clerk-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  FileIcon,
  FolderIcon,
  LogOutIcon,
  UploadIcon,
  HardDrive,
  Star,
  Clock,
  FolderTree,
} from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";
import FileUploader from "@/components/FileUploader";
import { getFolderStructure, createFolder } from "@/services/fileService";

const Dashboard = () => {
  const { user } = useUser();
  const { signOut } = useClerk();
  const [storageUsage, setStorageUsage] = useState({
    used: 0,
    limit: 5 * 1024 * 1024 * 1024,
    percentage: 0,
  });
  const [recentFiles, setRecentFiles] = useState([]);
  const [fileCount, setFileCount] = useState(0);
  const [folderCount, setFolderCount] = useState(0);
  const [folders, setFolders] = useState<any[]>([]);

  const fetchFolders = async () => {
    try {
      const response = await getFolderStructure();
      setFolders(response);
    } catch (error) {
      console.error("Failed to fetch folders:", error);
    }
  };

  useEffect(() => {
    fetchFolders();
  }, []);

  const handleCreateFolder = async (name: string, parentFolderId?: string) => {
    try {
      await createFolder(name, parentFolderId);
      fetchFolders();
    } catch (error) {
      console.error("Failed to create folder:", error);
    }
  };

  const handleLogout = () => {
    signOut();
  };

  const [folderTree, setFolderTree] = useState<any[]>([]);

  const fetchFolderTree = async () => {
    try {
      const response = await getFolderStructure();
      setFolderTree(response);
    } catch (error) {
      console.error("Failed to fetch folder tree:", error);
    }
  };

  useEffect(() => {
    fetchFolderTree();
  }, []);

  const handleDeleteFolder = async (folderId: string) => {
    try {
      await deleteFolder(folderId);
      fetchFolderTree();
    } catch (error) {
      console.error("Failed to delete folder:", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
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
          className="flex items-center gap-2"
          onClick={handleLogout}
        >
          <LogOutIcon className="h-4 w-4" />
          Logout
        </Button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Storage</CardTitle>
            <HardDrive className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatBytes(storageUsage.used)}
            </div>
            <p className="text-xs text-muted-foreground">
              {formatBytes(storageUsage.limit)} total
            </p>
            <div className="mt-3 h-2 bg-secondary rounded-full">
              <div
                className="h-full bg-gradient-to-r from-zen-blue to-zen-purple rounded-full"
                style={{ width: `${storageUsage.percentage}%` }}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Files</CardTitle>
            <FileIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{fileCount}</div>
            <p className="text-xs text-muted-foreground">Total files</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Folders</CardTitle>
            <FolderIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{folderCount}</div>
            <p className="text-xs text-muted-foreground">Total folders</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Your recent file operations and changes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentFiles.length > 0 ? (
                  recentFiles.map((file, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                        <FileIcon className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{file.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatBytes(file.size)} •{" "}
                          {new Date(file.uploadedAt).toLocaleString()}
                        </p>
                      </div>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-muted-foreground py-8">
                    No recent files to display
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full justify-start gap-2">
                <UploadIcon className="h-4 w-4" />
                Upload File
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                <FolderIcon className="h-4 w-4" />
                Create Folder
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                <Star className="h-4 w-4" />
                Favorites
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                <Clock className="h-4 w-4" />
                Recent Files
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="mt-8">
        <FileUploader folders={folders} onUpload={() => {}} />

        <Button
          variant="outline"
          className="mt-4"
          onClick={() => handleCreateFolder("New Folder")}
        >
          <FolderIcon className="mr-2 h-4 w-4" />
          Create New Folder
        </Button>
      </div>
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Folder Structure</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {folderTree.map((folder) => (
                <div
                  key={folder.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <FolderIcon className="h-4 w-4" />
                    <span>{folder.name}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteFolder(folder.id)}
                  >
                    Delete
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return (
    parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + " " + sizes[i]
  );
};

export default Dashboard;
function deleteFolder(folderId: string) {
  throw new Error("Function not implemented.");
}
