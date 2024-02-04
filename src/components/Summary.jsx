// import React from 'react'
import Star from "../assets/star.svg";
import { useStore } from "../context/StoreContext";

const Summary = () => {
  const { tasks, inProgressTasks, completedTasks } = useStore();
  const cmptask = Number(completedTasks.length);
  const ttlTask = Number(tasks.length);
  const ratio = (cmptask * 100) / ttlTask;
  return (
    <div className="flex flex-col flex-wrap justify-start items-start gap-8">
      <div className="flex flex-row justify-start items-center md:items-start gap-2 md:gap-4 pl-2 md:pl-0">
        <img
          src={Star}
          alt="summary icon"
          className="w-[55px] h-auto md:w-[60px] md:h-[52.72px]"
        />
        <div className="flex flex-col justify-start md:justify-center items-start md:gap-2">
          <h2 className="text-black text-2xl md:text-3xl font-bold ">
            Summary
          </h2>
          <p className="text-black text-xs font-normal">
            Get a high-level overview of your todo list webpage.
          </p>
        </div>
      </div>
      <div className="w-screen md:w-[30vw] flex flex-col justify-center items-center md:items-start gap-7">
        <div className="w-[92vw] md:w-[445px] h-[166px] bg-purple-100 border-2 border-purple-500 flex flex-col justify-start items-start gap-1 pl-6 pt-6">
          <h2 className="w-[156.21px] text-black text-3xl font-normal font-['Delius Swash Caps']">
            Total Tasks
          </h2>
          <p className="pl-1">
            <span className="text-stone-900 text-[15px] font-normal leading-snug">
              There are currently{" "}
            </span>
            <span className="text-stone-900 text-[15px] font-bold leading-snug">
              {ttlTask + " tasks"}
            </span>
            <span className="text-stone-900 text-[15px] font-normal font-['Inter'] leading-snug">
              {" "}
              in your todo list.
            </span>
          </p>
        </div>
        <div className="w-[92vw] md:w-[445px] h-[166px] bg-purple-100 border-2 border-purple-500 flex flex-col justify-start items-start gap-1 pl-6 pt-6">
          <h2 className="text-black text-3xl font-normal font-['Delius Swash Caps']">
            Task Progress
          </h2>
          <p className="pl-1">
            <span className="text-stone-900 text-[15px] font-normal leading-snug">
              The ratio of completed tasks to total tasks is{" "}
            </span>
            <span className="text-stone-900 text-[15px] font-bold font-['Inter'] leading-snug">
              {ttlTask === 0 ? "0" : ratio + " %"}
            </span>
            <span className="text-stone-900 text-[15px] font-normal leading-snug">
              .
            </span>
          </p>
        </div>
        <div className="w-[92vw] md:w-[445px] h-[166px] bg-purple-100 border-2 border-purple-500 flex flex-col justify-start items-start gap-1 pl-6 pt-6">
          <h2 className="text-black text-3xl font-normal font-['Delius Swash Caps']">
            Pending Tasks
          </h2>
          <p className="pl-1">
            <span className="text-stone-900 text-[15px] font-normal leading-snug">
              There are currently{" "}
            </span>
            <span className="text-stone-900 text-[15px] font-bold leading-snug">
              {inProgressTasks.length + " tasks"}
            </span>
            <span className="text-stone-900 text-[15px] font-normal font-['Inter'] leading-snug">
              {" "}
              in your todo list.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Summary;
