import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StorageInfoCardProps {
  totalFiles: number;
  usedMB: number;
  totalMB: number;
}

const getPercent = (used: number, total: number) =>
  Math.round((used / total) * 100);

const StorageInfoCard = ({
  totalFiles,
  usedMB,
  totalMB,
}: StorageInfoCardProps) => {
  const percent = getPercent(usedMB, totalMB);
  const radius = 40;
  const stroke = 8;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  return (
    <Card className="w-full max-w-xs bg-[#2c2c2e] border-[#3b82f6]/20 text-white">
      <CardHeader>
        <CardTitle className="text-white">Storage Usage</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        <div className="relative w-24 h-24">
          <svg height="100%" width="100%" viewBox="0 0 80 80">
            <circle
              stroke="#3b82f620"
              fill="transparent"
              strokeWidth={stroke}
              r={normalizedRadius}
              cx={40}
              cy={40}
            />
            <circle
              stroke="#3b82f6"
              fill="transparent"
              strokeWidth={stroke}
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              r={normalizedRadius}
              cx={40}
              cy={40}
              style={{ transition: "stroke-dashoffset 0.5s" }}
            />
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dy=".3em"
              fontSize="1.2em"
              fill="#3b82f6"
              fontWeight="bold"
            >
              {percent}%
            </text>
          </svg>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-white">
            {usedMB} MB used out of {totalMB} GB
          </div>
          <div className="text-white/70 text-sm">
            {totalFiles} files uploaded
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StorageInfoCard;
