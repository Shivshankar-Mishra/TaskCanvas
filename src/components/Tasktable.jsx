// import React from 'react';
import Checkmarkicon from "../assets/checkmark.svg";
import { useStore } from "../context/StoreContext";

const Tasktable = () => {
  const { tasks, updateTaskStatus } = useStore();

  return (
    <div className="w-screen md:w-[80vw] flex flex-col justify-start md:justify-center items-start">
      <div className=" flex flex-row justify-start items-center gap-4 ml-2 md:ml-0">
        <img
          src={Checkmarkicon}
          alt="check mark svg"
          className="md:w-[52.21px] md:h-[57.60px]"
        />
        <div className="flex flex-col justify-center items-start">
          <h2 className="text-stone-900 text-3xl font-bold leading-[45px]">
            Task List
          </h2>
          <div className="text-stone-600 md:w-[435px] text-lg font-normal leading-5 md:leading-[30px]">
            View and manage your tasks in the table below.
          </div>
        </div>
      </div>
      <div className="w-screen md:w-[70vw] flex flex-row justify-start md:justify-center items-start md:items-center mt-4 mx-auto md:ml-16">
        <table className="w-[100%] md:w-[80vw] table border-collapse border-2 border-solid">
          <thead className="w-[100%] table-header-group">
            <tr>
              <th className="w-[25%] md:w-[280px] h-10 text-left bg-black  text-white text-sm font-bold leading-[18px] px-3">
                Task
              </th>
              <th className="w-[25%] md:w-[280px] h-10 text-left bg-black text-white text-sm font-bold leading-[18px] px-3">
                Priority
              </th>
              <th className="w-[25%] md:w-[280px] h-10 text-left bg-black text-white text-sm font-bold leading-[18px] px-3">
                Status
              </th>
              <th className="w-[25%] md:w-[280px] h-10 text-left bg-black text-white text-sm font-bold leading-[18px] px-3">
                Action
              </th>
            </tr>
          </thead>
          {tasks.length === 0 ? (
            <tbody>
            <tr aria-colspan={4}>
            <td className="text-stone-900 text-[15px] font-normal px-3 py-2">
              No tasks available.
            </td>
            </tr>
            </tbody>
          ) : (
            <tbody className="table-row-group w-[100%] ">
              {tasks.map((task) => (
                <tr
                  key={task.id}
                  className="table-row w-[100%] even:bg-gray-200 hover:bg-gray-300"
                >
                  <td className="table-cell w-[32%] md:w-[280px] h-11 text-stone-900 text-[15px] line-clamp-2 font-normal border-2 border-solid leading-snug px-3 py-1">
                    {task.taskName}
                  </td>
                  <td className="table-cell w-[18%] md:w-[280px] h-11 text-stone-900 text-[15px] font-normal border-2 border-solid leading-snug px-3 py-1">
                    {task.taskPriority}
                  </td>
                  <td className="table-cell w-[25%] md:w-[280px] h-11 text-stone-900 text-[15px] font-normal border-2 border-solid leading-snug px-3 py-1">
                    {task.status || "In Progress"}
                  </td>
                  <td className="table-cell w-[25%] md:w-[280px] h-11 text-stone-900 text-[15px] font-normal border-2 border-solid leading-snug px-3 py-1">
                    <button
                      className="text-blue-600 hover:bg-gray-200 rounded-2xl px-2 py-1"
                      onClick={() => {
                        // Change status to "Completed"
                        // Make sure the task has a status field
                        if (task.status === "In Progress") {
                          // Update the status in the context
                          // You might want to implement this logic in your context
                          // For now, let's assume you have a function updateTaskStatus in your context
                          // It should update the task status by task id
                          updateTaskStatus(task.id, "Completed");
                        }
                      }}
                    >
                      {task.status === "In Progress" ? "Mark as Complete" : ""}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default Tasktable;
