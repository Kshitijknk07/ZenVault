import React, { useState } from "react";
import { createFolder, uploadFile } from "../services/fileService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FolderPlus, FolderPlusIcon } from "lucide-react";

const FileUploader = ({
  folders,
  onUpload,
}: {
  folders: any[];
  onUpload: () => void;
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [folderId, setFolderId] = useState<string>("");
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");

  const handleCreateFolder = async () => {
    if (newFolderName.trim()) {
      try {
        await createFolder(newFolderName, folderId || undefined);
        onUpload();
        setIsCreatingFolder(false);
        setNewFolderName("");
      } catch (error) {
        console.error("Failed to create folder:", error);
      }
    }
  };

  const handleUpload = async () => {
    if (file) {
      try {
        await uploadFile(file, folderId || undefined);
        onUpload();
        setFile(null);
        setFolderId("");
      } catch (error) {
        console.error("Upload failed:", error);
      }
    }
  };

  return (
    <div className="space-y-4">
      <Input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />

      <div className="flex gap-2">
        <Select onValueChange={setFolderId} value={folderId}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select folder" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Root Folder</SelectItem>
            {folders.map((folder) => (
              <SelectItem key={folder.id} value={folder.id}>
                {folder.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          variant="outline"
          onClick={() => setIsCreatingFolder(!isCreatingFolder)}
        >
          <FolderPlus className="mr-2 h-4 w-4" />
          New Folder
        </Button>
      </div>

      {isCreatingFolder && (
        <div className="flex gap-2">
          <Input
            placeholder="New folder name"
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
          />
          <Button onClick={handleCreateFolder}>Create</Button>
        </div>
      )}

      <Button onClick={handleUpload} disabled={!file}>
        Upload
      </Button>
    </div>
  );
};

export default FileUploader;
