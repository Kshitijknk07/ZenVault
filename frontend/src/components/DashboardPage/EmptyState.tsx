import { FaRegFolderOpen } from "react-icons/fa";

const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <FaRegFolderOpen className="text-6xl text-muted-foreground mb-4" />
      <div className="text-xl font-semibold mb-2">No files yet</div>
      <div className="text-muted-foreground">
        Start by uploading your first file!
      </div>
    </div>
  );
};

export default EmptyState;
