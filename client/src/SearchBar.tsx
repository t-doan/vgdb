import { useState } from 'react';

export function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  async function handleSearch() {
    try {
      const response = await fetch(`/api/search?query=${query}`);
      const data = await response.json();
      onSearch(data);
    } catch (e) {
      console.error(`Error fetching data: ${e}`);
    }
  }

  return (
    <div>
      <input
        className="Search w-[600px] h-[45px] bg-zinc-100 rounded-[26.25px] justify-center text-black"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for games"
      />

      <button
        className="w-[120px] h-[45px] bg-zinc-100 text-black rounded-[26.25px] hover:bg-red-600"
        onClick={handleSearch}>
        Search
      </button>
    </div>
  );
}
