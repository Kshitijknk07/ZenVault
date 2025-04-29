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
        className="bg-background border-muted"
      />
    </div>
  );
};

export default SearchBar;
