// import React from 'react'
import Clock from "../assets/clock.svg";
import { useStore } from "../context/StoreContext";
import StickyCard from "../templates/StickyCard";
import TaskCard from "../templates/Task-card";

const Progress = () => {
  const { tasks, stickyNotes, inProgressTasks, pinnedSticky } = useStore();

  return (
    <div className="flex flex-col justify-start items-start gap-7 md:gap-5">
      <div className="flex flex-row justify-start items-center gap-3 md:gap-5 pl-2 md:pl-0">
        <img
          src={Clock}
          alt="clock svg"
          className="w-[45px] h-auto md:w-[50px] md:h-[54.45px]"
        />
        <div className="flex flex-col justify-center items-start md:gap-2">
          <h2 className="text-black text-2xl md:text-3xl font-bold ">
            Task Progress
          </h2>
          <p className="text-black text-xs font-normal">
            Track the progress of pending tasks and pinned sticky.
          </p>
        </div>
      </div>
      <div className="w-screen shrink-[2] md:w-auto flex flex-col justify-center md:justify-start items-center md:items-start gap-5">
        <div className="w-[90vw] h-[35vh] md:w-[794px] md:h-[270px] shrink bg-blue-100 rounded-[30px] border-2 border-sky-500 flex flex-col justify-start items-start pt-3 pl-5 md:pl-10">
          <h2 className="text-black text-xl font-semibold">Pending Tasks</h2>
          <div className="w-[83vw] md:w-[730px] h-auto overflow-x-auto">
            {inProgressTasks.length > 0 ? (
              <div className="flex flex-row justify-start md:justify-between items-center gap-5">
                {inProgressTasks.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </div>
            ) : (
              <p className="w-[40%] md:w-[100%] text-black text-lg font-normal text-center mx-auto md:mx-0 my-10 py-5">
                {tasks.length === 0
                  ? "No task available."
                  : "All tasks are completed. For more details, visit Task Page."}
              </p>
            )}
          </div>
        </div>
        <div className="w-[90vw] h-[40vh] md:w-[794px] md:h-[275px] shrink bg-blue-100 rounded-[30px] border-2 border-sky-500 flex flex-col justify-start items-start gap-1 pt-3 pl-5 md:pl-8">
          <h2 className="text-black text-xl font-semibold static">
            Pinned Sticky
          </h2>
          <div className="w-[83vw] md:w-[730px] h-[250px] overflow-x-auto ">
            {pinnedSticky.length > 0 ? (
              <div className="flex flex-row flex-nowrap justify-between items-start gap-6">
                {pinnedSticky.map((note) => (
                  <StickyCard key={note.id} stickyNote={note} />
                ))}
              </div>
            ) : (
              <p className=" md:w-[100%] text-black text-lg font-normal text-center my-10 py-5 px-4">
                {stickyNotes.length === 0
                  ? "No sticky notes available."
                  : "No pinned sticky notes. Visit Sticky Page to pin StickyCard."}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Progress;
