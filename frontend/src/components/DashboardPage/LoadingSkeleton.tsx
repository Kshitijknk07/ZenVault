const LoadingSkeleton = ({ count = 8 }: { count?: number }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="flex flex-col items-center p-4 w-40 animate-pulse bg-muted rounded-lg"
        >
          <div className="w-12 h-12 bg-gray-300 rounded mb-2" />
          <div className="h-4 w-24 bg-gray-300 rounded mb-1" />
          <div className="h-3 w-16 bg-gray-200 rounded mb-1" />
          <div className="h-3 w-20 bg-gray-200 rounded" />
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
