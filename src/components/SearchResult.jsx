// import React from 'react'

import { useStore } from "../context/StoreContext";
import StickyCard from "../templates/StickyCard";
import TaskCard from "../templates/Task-card";

const SearchResult = () => {
  const { searchResults, setShowSearchResult } = useStore();

  const handleSearchResultClose = () => {
    setShowSearchResult(false);
  };

  return (
    <div className="relative w-screen md:w-[794px] md:h-[300px] bg-green-100 rounded-[30px] border-2 border-green-500 flex flex-col justify-start items-start gap-1 pt-3 pl-8">
      <div
        onClick={handleSearchResultClose}
        className="absolute top-2 right-2 w-8 h-6 rounded-xl text-center text-white hover:scale-105 cursor-pointer bg-red-500"
      >
        X
      </div>
      <h2 className="text-black text-xl font-semibold static">
        Searched Result
      </h2>
      <div className="w-[85vw] h-[33vh] md:w-[730px] md:h-[250px] flex flex-row flex-wrap md:flex-nowrap justify-center md:justify-between items-start gap-2 overflow-x-auto">
        {searchResults.map((item, index) => {
          if (item.taskName) {
            return <TaskCard key={index} task={item} />;
          } else if (item.title) {
            return <StickyCard key={index} stickyNote={item} />;
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default SearchResult;
