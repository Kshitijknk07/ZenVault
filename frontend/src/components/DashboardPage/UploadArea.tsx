import { useState } from "react";
import { FileUpload } from "@/components/ui/file-upload";
import { toast } from "@/hooks/use-toast";

const UploadArea = () => {
  const [, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileUpload = (newFiles: File[]) => {
    setFiles(newFiles);
    if (newFiles.length > 0) {
      uploadFiles(newFiles);
    }
  };

  const uploadFiles = (filesToUpload: File[]) => {
    setUploading(true);
    setProgress(0);

    // Simulate upload progress
    let prog = 0;
    const interval = setInterval(() => {
      prog += 10;
      setProgress(prog);
      if (prog >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setUploading(false);
          toast({
            title: "Upload Complete",
            description: `${filesToUpload.length} file(s) uploaded successfully.`,
          });
        }, 500);
      }
    }, 150);
    // TODO: Replace with actual upload logic
  };

  return (
    <div className="w-full">
      <FileUpload onChange={handleFileUpload} />
      {uploading && (
        <div className="w-full mt-4">
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-2 bg-primary transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-xs text-muted-foreground mt-1 text-center">
            Uploading... {progress}%
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadArea;
