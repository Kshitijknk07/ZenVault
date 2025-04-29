import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaDownload, FaTrash, FaExpand } from "react-icons/fa";

interface FileCardProps {
  id: string;
  name: string;
  size: number;
  type: string;
  url?: string;
  onDownload: (id: string) => void;
  onDelete: (id: string) => void;
  onView?: (id: string) => void;
}

const formatSize = (size: number) => {
  if (size > 1024 * 1024) return (size / (1024 * 1024)).toFixed(1) + " MB";
  if (size > 1024) return (size / 1024).toFixed(1) + " KB";
  return size + " B";
};

const FileCard = ({
  id,
  name,
  size,
  type,
  url,
  onDownload,
  onDelete,
  onView,
}: FileCardProps) => {
  return (
    <Card className="flex flex-col items-center p-3 w-40">
      <CardContent className="flex flex-col items-center gap-2 p-0">
        {type.startsWith("image/") && url ? (
          <img
            src={url}
            alt={name}
            className="w-12 h-12 object-cover rounded"
          />
        ) : (
          <div className="w-12 h-12 flex items-center justify-center bg-muted rounded">
            <span className="text-2xl">📄</span>
          </div>
        )}
        <div className="font-medium text-center truncate w-32" title={name}>
          {name}
        </div>
        <div className="text-xs text-muted-foreground">{formatSize(size)}</div>
        <div className="flex gap-2 mt-2">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => onDownload(id)}
            title="Download"
          >
            <FaDownload />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => onDelete(id)}
            title="Delete"
          >
            <FaTrash className="text-red-500" />
          </Button>
          {onView && (
            <Button
              size="icon"
              variant="ghost"
              onClick={() => onView(id)}
              title="View Full Screen"
            >
              <FaExpand />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default FileCard;
