import { Card, CardContent } from "@/components/ui/card";
import { FaFileImage, FaFileVideo, FaFilePdf, FaFileAlt } from "react-icons/fa";

interface FileItem {
  id: string;
  name: string;
  size: number; // in bytes
  uploadDate: string; // ISO string
  type: string; // mime type
  url?: string; // for preview
}

interface FilesGalleryProps {
  files: FileItem[];
}

const getFileIcon = (type: string) => {
  if (type.startsWith("image/"))
    return <FaFileImage className="text-blue-400 w-8 h-8" />;
  if (type.startsWith("video/"))
    return <FaFileVideo className="text-purple-400 w-8 h-8" />;
  if (type === "application/pdf")
    return <FaFilePdf className="text-red-400 w-8 h-8" />;
  return <FaFileAlt className="text-muted-foreground w-8 h-8" />;
};

const formatSize = (size: number) => {
  if (size > 1024 * 1024) return (size / (1024 * 1024)).toFixed(1) + " MB";
  if (size > 1024) return (size / 1024).toFixed(1) + " KB";
  return size + " B";
};

const formatDate = (iso: string) => new Date(iso).toLocaleDateString();

const FilesGallery = ({ files }: FilesGalleryProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {files.map((file) => (
        <Card key={file.id} className="flex flex-col items-center p-4">
          <CardContent className="flex flex-col items-center gap-2">
            {file.type.startsWith("image/") && file.url ? (
              <img
                src={file.url}
                alt={file.name}
                className="w-16 h-16 object-cover rounded"
              />
            ) : (
              getFileIcon(file.type)
            )}
            <div
              className="font-medium text-center truncate w-32"
              title={file.name}
            >
              {file.name}
            </div>
            <div className="text-xs text-muted-foreground">
              {formatSize(file.size)}
            </div>
            <div className="text-xs text-muted-foreground">
              {formatDate(file.uploadDate)}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default FilesGallery;
