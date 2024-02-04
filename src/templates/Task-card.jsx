// import React from 'react'
import Markicon from "../assets/mark.svg";
import Editicon from "../assets/edit.svg";
import Deleteicon from "../assets/delete.svg";
import { useStore } from "../context/StoreContext";
import { useState } from "react";
import EditTask from "../components/EditTask";

const TaskCard = (props) => {
  const { updateTaskStatus, deleteTask, updateTaskData, scrollToTop } = useStore();
  const { taskName, taskDescription, id, status } = props.task;

  const [isEditing, setEditing] = useState(false);

  const handleDeleteTask = () => {
    deleteTask(id);
  };

  const handleEditClick = () => {
    setEditing(true);
    scrollToTop();
  };

  const handleEditClose = () => {
    setEditing(false);
  };

  return (
    <div className="flex flex-col justify-start items-center gap-3 w-[220px] h-[171px] bg-white rounded-[10px] mt-5 md:mt-10 ">
      <h3 className="text-center text-neutral-500 text-xs line-clamp-2 font-semibold leading-[18px] mt-1">
        {taskName}
      </h3>
      <p className="w-[200px] h-16 break-word line-clamp-4 text-left text-black text-[10px] font-light leading-[15px]">
        {taskDescription}
      </p>
      <div className="flex flex-row justify-between items-center gap-1 mt-3">
        <button
          onClick={() => {
            if (status === "In Progress") {
              updateTaskStatus(id, "Completed");
            }
          }}
          className={` ${
            status === "In Progress" ? "flex" : "hidden"
          } flex-row justify-center items-center gap-[2px] w-[68px] h-6 bg-green-600 hover:bg-green-800 rounded-[10px] px-[10px] py-1`}
        >
          <img src={Markicon} alt="mark icon" className="w-[18px] h-[18px]" />
          <span className="text-center text-white text-xs font-semibold leading-[18px]">
            Mark
          </span>
        </button>
        <button
          onClick={handleEditClick}
          className="flex flex-row justify-center items-center gap-[2px] w-[68px] h-6 bg-neutral-600 hover:bg-neutral-800 rounded-[10px] px-[10px] py-1"
        >
          <img src={Editicon} alt="edit icon" className="w-[18px] h-[18px]" />
          <span className="text-center text-white text-xs font-semibold leading-[18px]">
            Edit
          </span>
        </button>
        <button
          onClick={handleDeleteTask}
          className="flex flex-row justify-center items-center gap-[2px] w-[68px] h-6 bg-red-500 hover:bg-red-700 rounded-[10px] px-[10px] py-1"
        >
          <img src={Deleteicon} alt="mark icon" className="w-[18px] h-[18px]" />
          <span className="text-center text-white text-xs font-semibold leading-[18px]">
            Delete
          </span>
        </button>
      </div>
      {isEditing && (
        <EditTask
          task={props.task}
          onClose={handleEditClose}
          updateTaskData={updateTaskData}
          updateTaskStatus={updateTaskStatus}
        />
      )}
    </div>
  );
};

export default TaskCard;
