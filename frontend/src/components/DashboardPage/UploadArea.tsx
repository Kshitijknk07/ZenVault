import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";

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
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFiles = (_files: FileList) => {
    setUploading(true);
    setProgress(0);
    // Simulate upload progress
    let prog = 0;
    const interval = setInterval(() => {
      prog += 10;
      setProgress(prog);
      if (prog >= 100) {
        clearInterval(interval);
        setTimeout(() => setUploading(false), 500);
      }
    }, 150);
    // TODO: Replace with actual upload logic
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center transition-colors ${
        dragActive ? "border-primary bg-muted" : "border-muted"
      }`}
      onDragEnter={handleDrag}
      onDragOver={handleDrag}
      onDragLeave={handleDrag}
      onDrop={handleDrop}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept={ACCEPTED_TYPES.join(",")}
        multiple={false}
        className="hidden"
        onChange={handleInputChange}
      />
      <div className="text-center mb-4">
        <p className="text-lg font-semibold mb-2">Drag & drop your file here</p>
        <p className="text-muted-foreground mb-4">or</p>
        <Button size="lg" onClick={handleButtonClick} disabled={uploading}>
          Upload
        </Button>
      </div>
      {uploading && (
        <div className="w-full max-w-xs mt-4">
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
