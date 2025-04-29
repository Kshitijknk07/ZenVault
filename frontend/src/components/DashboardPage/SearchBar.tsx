import { Input } from "@/components/ui/input";
import { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [value, setValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="w-full max-w-md mx-auto my-2">
      <Input
        type="text"
        placeholder="Search files by name..."
        value={value}
        onChange={handleChange}
        className="bg-[#2c2c2e] border-[#3b82f6]/30 text-white focus:border-[#3b82f6] focus:ring-[#3b82f6]/20"
      />
    </div>
  );
};

export default SearchBar;
