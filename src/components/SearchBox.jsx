// import React from 'react'

import { useStore } from "../context/StoreContext";

const SearchBox = () => {
  const { searchQuery, handleInputChange, handleSearchSubmit, combinedResult } =
    useStore();
  return (
    <form
      onSubmit={handleSearchSubmit}
      className="flex flex-row flex-wrap justify-center gap-3 md:gap-1"
    >
      <input
        type="text"
        list="titles"
        value={searchQuery}
        onChange={handleInputChange}
        placeholder="Search..."
        className="w-[13rem] md:w-[10rem] border border-gray-400 rounded-md px-2 py-1"
        autoFocus
        required
      />
      <datalist id="titles">
        {combinedResult.map((item, index) => (
          <option key={index} value={item.taskName || item.title} />
        ))}
      </datalist>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white px-2 py-1 rounded-md"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBox;
