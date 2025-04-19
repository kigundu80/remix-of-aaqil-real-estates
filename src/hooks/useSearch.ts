
import { useState } from "react";
import { PropertyType } from "@/types/property";
import { searchProperties } from "@/services/searchService";

export const useSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<PropertyType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (searchQuery: string) => {
    setQuery(searchQuery);
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    try {
      const searchResults = await searchProperties(searchQuery);
      setResults(searchResults);
    } catch (error) {
      console.error("Search failed:", error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    query,
    results,
    isLoading,
    handleSearch,
  };
};
