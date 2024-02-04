import { useState } from "react";
import { useStore } from "../context/StoreContext";
import Pensvg from "../assets/pencil.svg";
import TaskCard from "../templates/Task-card";

const Taskcards = () => {
  const { tasks } = useStore();
  const [currentPage, setCurrentPage] = useState(1);

  // Define number of tasks per page based on screen size
  const tasksPerPage = window.innerWidth <= 768 ? 2 : 6;

  // Calculate total pages based on number of tasks and tasks per page
  const totalPages = Math.ceil(tasks.length / tasksPerPage);

  // Calculate starting index and ending index of tasks for current page
  const startIndex = (currentPage - 1) * tasksPerPage;
  const endIndex = Math.min(startIndex + tasksPerPage, tasks.length);
  const displayedTasks = tasks.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="w-[90vw] md:w-[776px] md:h-[625px] bg-green-300 rounded-[30px] border-2 border-blue-800">
      <div className="flex flex-row justify-start items-center gap-[10px] mx-5 md:mx-12 my-3">
        <img src={Pensvg} alt="pen svg" className="w-12 h-[43px]" />
        <div className="flex flex-col justify-center items-start">
          <div className="text-black text-xl font-bold ">Task Cards</div>
          <div className="text-stone-600 text-[12px] font-normal leading-[15px]">
            Manage your tasks with ease using task cards.
          </div>
        </div>
      </div>
      {/* Render task cards */}
      <div className="flex flex-row flex-wrap justify-center md:justify-between items-center px-5">
        {displayedTasks.length > 0 ? (
          displayedTasks.map((task, index) => (
            <TaskCard key={index} task={task} />
          ))
        ) : (
          <div className="text-center text-lg text-gray-600 md:mx-auto mt-40">
            No tasks available.
          </div>
        )}
      </div>
      {/* Render page navigation buttons */}
      {tasks.length > 0 && (
        <div className="flex justify-center items-center mt-8 mb-5 md:mb-0">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={`mx-1 p-2 rounded-full ${
                currentPage === index + 1
                  ? "bg-purple-500 text-white"
                  : "bg-blue-500 hover:bg-blue-700 text-white"
              }`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Taskcards;
