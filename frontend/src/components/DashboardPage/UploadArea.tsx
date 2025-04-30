import { useState } from "react";
import { FileUpload } from "@/components/ui/file-upload";
import { toast } from "@/hooks/use-toast";

const ACCEPTED_TYPES = [
  "image/*",
  "video/*",
  ".pdf",
  ".doc",
  ".docx",
  ".xls",
  ".xlsx",
  ".ppt",
  ".pptx",
  ".txt",
];

const UploadArea = () => {
  const [, setFiles] = useState<File[]>([]);
  const [, setUploading] = useState(false);
  const [, setProgress] = useState(0);

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
      <FileUpload onChange={handleFileUpload} accept={ACCEPTED_TYPES} />
    </div>
  );
};

export default UploadArea;
