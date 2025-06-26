import React from "react";

interface SearchFormProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  limit: number;
  setLimit: (l: number) => void;
  onSearch: () => void;
}

const SearchForm: React.FC<SearchFormProps> = ({
  searchQuery,
  setSearchQuery,
  limit,
  setLimit,
  onSearch,
}) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSearch();
      }}
      className="flex flex-col md:flex-row gap-4 mb-6"
    >
      <input
        type="text"
        placeholder="Поисковый запрос"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="border px-4 py-2 rounded w-full md:w-auto"
      />
      <input
        type="number"
        min={1}
        max={1000}
        value={limit}
        onChange={(e) => setLimit(Number(e.target.value))}
        className="border px-4 py-2 rounded w-full md:w-32"
      />
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
      >
        Парсить
      </button>
    </form>
  );
};

export default SearchForm;