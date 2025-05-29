import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, X } from "lucide-react";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { uploadFile } from "../api/files";
import { FileUploadProgress } from "../types/file";

interface FileUploadProps {
  folderId?: string | null;
  onUploadComplete?: () => void;
}

export function FileUpload({
  folderId = null,
  onUploadComplete,
}: FileUploadProps) {
  const [uploadingFiles, setUploadingFiles] = useState<FileUploadProgress[]>(
    []
  );

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const newUploads = acceptedFiles.map((file) => ({
        fileId: Math.random().toString(36).substring(7),
        progress: 0,
        status: "uploading" as const,
      }));

      setUploadingFiles((prev) => [...prev, ...newUploads]);

      for (const file of acceptedFiles) {
        try {
          await uploadFile(file, folderId);
          setUploadingFiles((prev) =>
            prev.map((upload) =>
              upload.fileId === file.name
                ? { ...upload, status: "completed", progress: 100 }
                : upload
            )
          );
        } catch (error) {
          setUploadingFiles((prev) =>
            prev.map((upload) =>
              upload.fileId === file.name
                ? {
                    ...upload,
                    status: "error",
                    error: (error as Error).message,
                  }
                : upload
            )
          );
        }
      }

      onUploadComplete?.();
    },
    [folderId, onUploadComplete]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
  });

  const removeUpload = (fileId: string) => {
    setUploadingFiles((prev) =>
      prev.filter((upload) => upload.fileId !== fileId)
    );
  };

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragActive
            ? "border-emerald-500 bg-emerald-500/10"
            : "border-slate-700 hover:border-emerald-500/50"
        }`}
      >
        <input {...getInputProps()} />
        <Upload className="w-8 h-8 mx-auto mb-4 text-slate-400" />
        <p className="text-slate-400">
          {isDragActive
            ? "Drop the files here..."
            : "Drag & drop files here, or click to select files"}
        </p>
      </div>

      {uploadingFiles.length > 0 && (
        <div className="space-y-2">
          {uploadingFiles.map((upload) => (
            <div
              key={upload.fileId}
              className="flex items-center gap-4 p-4 bg-slate-800/50 rounded-lg"
            >
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-300">
                    {upload.fileId}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeUpload(upload.fileId)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                <Progress value={upload.progress} className="h-2" />
                {upload.status === "error" && (
                  <p className="text-sm text-red-400 mt-1">{upload.error}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
