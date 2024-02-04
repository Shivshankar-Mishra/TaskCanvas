import Pensvg from "../assets/pencil.svg";
import Button from "../templates/Button";
import { useStore } from "../context/StoreContext";
import { useState } from "react";
import useAuth from "../templates/useAuth";

const Addtask = () => {
  const { currentUser } = useAuth();
  const { taskData, setTaskData, addTask } = useStore();

  const [nameError, setNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [priorityError, setPriorityError] = useState("");

  const validateName = (value) => {
    if (!value.trim()) {
      setNameError("Task name is required");
      return false;
    } else {
      setNameError("");
      return true;
    }
  };

  const validateDescription = (value) => {
    if (!value.trim()) {
      setDescriptionError("Task description is required");
      return false;
    } else {
      setDescriptionError("");
      return true;
    }
  };

  const validatePriority = (value) => {
    if (!value) {
      setPriorityError("Task priority is required");
      return false;
    } else {
      setPriorityError("");
      return true;
    }
  };

  const handleTaskDataChange = (event) => {
    const { name, value } = event.target;
    setTaskData((prevTaskData) => ({
      ...prevTaskData,
      [name]: value,
    }));

    // Check validation on input change
    if (name === "taskName") {
      validateName(value);
    } else if (name === "taskDescription") {
      validateDescription(value);
    } else if (name === "taskPriority") {
      validatePriority(value);
    }
  };
  const resetForm = () => {
    setTaskData({
      taskName: "",
      taskDescription: "",
      taskPriority: "",
      status: "In Progress",
    });
    setNameError("");
    setDescriptionError("");
    setPriorityError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields before submitting
    const isNameValid = validateName(taskData.taskName);
    const isDescriptionValid = validateDescription(taskData.taskDescription);
    const isPriorityValid = validatePriority(taskData.taskPriority);

    // Only add task if all fields are valid
    if (isNameValid && isDescriptionValid && isPriorityValid) {
      try {
        // Add task to Firestore
        addTask(currentUser.uid); // Pass the current user's ID
        console.log("Task added:", taskData);
        console.log("Task added", taskData);
        resetForm(); // Reset the form after submitting
      } catch (error) {
        console.error("Error adding task:", error.message);
      }
    }
  };

  return (
    <div className="h-[63vh] md:w-[354px] md:h-[520px] bg-slate-200 rounded-[30px] border-2 border-green-600">
      <div className="flex flex-row justify-start items-center gap-[6px] mx-5 my-3">
        <div className="w-12 h-[43px]">
          <img src={Pensvg} alt="pen svg" className="w-12 h-[43px]" />
        </div>
        <div className="flex flex-col justify-center items-start">
          <div className="text-black text-xl font-bold ">Add Task</div>
          <div className="text-stone-600 text-[12px] font-normal leading-[15px]">
            Enter a new task into the todo list.
          </div>
        </div>
      </div>
      <form action="" onSubmit={handleSubmit}>
        <div className="flex flex-col justify-center items-start gap-5">
          <div className="flex flex-col justify-center items- gap-2 mx-3">
            <label
              htmlFor="taskname"
              className="text-black text-[15px] font-semibold"
            >
              Task Name
            </label>
            <input
              type="text"
              id="taskname"
              name="taskName"
              value={taskData.taskName}
              placeholder="Please enter details here"
              onChange={handleTaskDataChange}
              className={`w-[275px] h-[27px] bg-white rounded-[5px] border ${
                nameError ? "border-red-500" : "border-stone-300"
              } placeholder:text-stone-400 placeholder:text-[10px] placeholder:font-normal placeholder:leading-[15px] px-3 py-4 hover:border-solid focus-within:border-solid hover:border-slate-600 focus:border-slate-600`}
            />
            {nameError && (
              <span className="text-red-500 text-[10px]">{nameError}</span>
            )}
          </div>
          <div className="flex flex-col justify-center items- gap-2 mx-3">
            <label className="text-black text-[15px] font-semibold">
              Task Description
            </label>
            <textarea
              id="description"
              name="taskDescription"
              cols="30"
              rows="10"
              value={taskData.taskDescription}
              placeholder="Please enter details here"
              onChange={handleTaskDataChange}
              className={`w-[275px] h-[118px] bg-white rounded-[5px] border ${
                descriptionError ? "border-red-500" : "border-stone-300"
              } placeholder:text-stone-400 placeholder:text-[10px] placeholder:font-normal placeholder:leading-[15px] px-3 py-2 hover:border-solid focus-within:border-solid hover:border-slate-600 focus:border-slate-600`}
            ></textarea>
            {descriptionError && (
              <span className="text-red-500 text-[10px]">
                {descriptionError}
              </span>
            )}
          </div>
          <div className="flex flex-col justify-center items- gap-2 mx-3">
            <label className="text-black text-[15px] font-semibold">
              Task Priority
            </label>
            <div className="flex flex-row justify-start items-center gap-3">
              <div className="flex flex-row justify-center items-center gap-1">
                <input
                  type="radio"
                  id="lowPriority"
                  name="taskPriority"
                  value="low"
                  checked={taskData.taskPriority === "low"}
                  onChange={handleTaskDataChange}
                />
                <label
                  htmlFor="lowPriority"
                  className="text-zinc-600 text-xs font-semibold"
                >
                  Low
                </label>
              </div>
              <div className="flex flex-row justify-center items-center gap-1">
                <input
                  type="radio"
                  id="mediumPriority"
                  name="taskPriority"
                  value="medium"
                  checked={taskData.taskPriority === "medium"}
                  onChange={handleTaskDataChange}
                />
                <label
                  htmlFor="mediumPriority"
                  className="text-zinc-600 text-xs font-semibold"
                >
                  Medium
                </label>
              </div>
              <div className="flex flex-row justify-center items-center gap-1">
                <input
                  type="radio"
                  id="highPriority"
                  name="taskPriority"
                  value="high"
                  checked={taskData.taskPriority === "high"}
                  onChange={handleTaskDataChange}
                />
                <label
                  htmlFor="highPriority"
                  className="text-zinc-600 text-xs font-semibold"
                >
                  High
                </label>
              </div>
            </div>
            {priorityError && (
              <span className="text-red-500 text-[10px]">{priorityError}</span>
            )}
          </div>
        </div>
        <div className="flex flex-row justify-center items-center mt-8">
          <Button
            type="submit"
            wid="w-[167px]"
            hgt="h-[35px]"
            bgColor="bg-blue-600"
            hoverBgColor="hover:bg-blue-700"
            borderColor="border-blue-700"
            buttonName="Add Task"
          />
        </div>
      </form>
    </div>
  );
};

export default Addtask;
