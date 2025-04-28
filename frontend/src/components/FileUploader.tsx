import React, { useState } from "react";
import { uploadFile } from "../services/fileService";

const FileUploader = () => {
  const [file, setFile] = useState<File | null>(null);
  const [folderId, setFolderId] = useState<string>("");

  const handleUpload = async () => {
    if (file) {
      try {
        const result = await uploadFile(file, folderId);
        console.log("File uploaded:", result);
      } catch (error) {
        console.error("Upload failed:", error);
      }
    }
  };

  return (
    <div>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      <input
        type="text"
        placeholder="Folder ID (optional)"
        value={folderId}
        onChange={(e) => setFolderId(e.target.value)}
      />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default FileUploader;
