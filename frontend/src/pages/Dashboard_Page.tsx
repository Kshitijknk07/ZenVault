import DashNav from "@/components/DashboardPage/DashNav";
import DashSide from "@/components/DashboardPage/DashSide";
import UploadArea from "@/components/DashboardPage/UploadArea";
import StorageInfoCard from "@/components/DashboardPage/StorageInfoCard";
import FilesGallery from "@/components/DashboardPage/FilesGallery";
import SearchBar from "@/components/DashboardPage/SearchBar";
import EmptyState from "@/components/DashboardPage/EmptyState";
import LoadingSkeleton from "@/components/DashboardPage/LoadingSkeleton";
import { useState, useEffect } from "react";

interface FileItem {
  id: string;
  name: string;
  size: number;
  uploadDate: string;
  type: string;
  url?: string;
}

const exampleFiles: FileItem[] = [];

export default function Dashboard_Page() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const filteredFiles = exampleFiles.filter((file) =>
    file.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-background">
      <DashSide />
      <div className="flex-1 flex flex-col">
        <DashNav />
        <main className="flex-1 p-6 space-y-6 bg-background">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 space-y-4">
              <UploadArea />
              <SearchBar onSearch={setSearch} />
              {loading ? (
                <LoadingSkeleton />
              ) : filteredFiles.length === 0 ? (
                <EmptyState />
              ) : (
                <FilesGallery files={filteredFiles} />
              )}
            </div>
            <div className="w-full md:w-80 flex-shrink-0">
              <StorageInfoCard
                totalFiles={exampleFiles.length}
                usedMB={0}
                totalMB={10}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
