import { useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface FileData {
  id: string;
  name: string;
  size: number;
}

export function FileManager() {
  const { userId } = useAuth();
  const [files, setFiles] = useState<FileData[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      const formData = new FormData();
      Array.from(event.target.files).forEach((file) => {
        formData.append("files", file);
      });

      try {
        const response = await fetch("/api/files/upload", {
          method: "POST",
          body: formData,
          headers: {
            "X-User-ID": userId || "",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setFiles((prev) => [...prev, ...data.files]);
        }
      } catch (error) {
        console.error("Upload failed:", error);
      }
    }
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(`/api/files/search?query=${searchQuery}`, {
        headers: {
          "X-User-ID": userId || "",
        },
      });
      const data = await response.json();
      setFiles(data.files);
    } catch (error) {
      console.error("Search failed:", error);
    }
  };

  const handleDownload = async (fileId: string) => {
    try {
      const response = await fetch(`/api/files/${fileId}/download`, {
        headers: {
          "X-User-ID": userId || "",
        },
      });
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = files.find((f) => f.id === fileId)?.name || "file";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input type="file" multiple onChange={handleFileUpload} />
        <Button>Upload</Button>
      </div>

      <div className="flex gap-2">
        <Input
          placeholder="Search files..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button onClick={handleSearch}>Search</Button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {files.map((file) => (
          <div key={file.id} className="border p-4 rounded-lg">
            <h3>{file.name}</h3>
            <p>{file.size} bytes</p>
            <Button variant="secondary" onClick={() => handleDownload(file.id)}>
              Download
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
