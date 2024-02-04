import { useState } from "react";
import Modal from "react-modal";
import { useStore } from "../context/StoreContext";
import Pensvg from "../assets/pencil.svg";
import Button from "../templates/Button";

Modal.setAppElement("#root"); // Set the root element for the modal

const EditTask = ({ task, onClose }) => {
  const { tasks, setTasks, updateTaskData } = useStore();

  const [editedTask, setEditedTask] = useState({
    taskName: task.taskName,
    taskDescription: task.taskDescription,
    taskPriority: task.taskPriority,
  });

  const [nameError, setNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [priorityError, setPriorityError] = useState("");

  const handleEditTaskChange = (event) => {
    const { name, value } = event.target;
    setEditedTask((prevData) => ({ ...prevData, [name]: value }));
  };

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

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields before submitting
    const isNameValid = validateName(editedTask.taskName);
    const isDescriptionValid = validateDescription(editedTask.taskDescription);
    const isPriorityValid = validatePriority(editedTask.taskPriority);

    // Only update task if all fields are valid
    if (isNameValid && isDescriptionValid && isPriorityValid) {
      try {
        await updateTaskData(task.id, {
          taskName: editedTask.taskName,
          taskDescription: editedTask.taskDescription,
          taskPriority: editedTask.taskPriority,
          status: "In Progress", // You can set other fields as needed
        });

        const updatedTasks = tasks.map((taskItem) =>
          taskItem.id === task.id
            ? { ...taskItem, ...editedTask, status: "In Progress" }
            : taskItem
        );

        setTasks(updatedTasks);
        onClose(); // Close the edit form
      } catch (error) {
        console.error("Error updating task: ", error);
      }
    }
  };

  return (
    <Modal
      isOpen={true} // Set to true to open the modal
      onRequestClose={onClose}
      overlayClassName="Overlay"
      className="Modal"
    >
      <div className="absolute top-0 w-screen h-screen bg-slate-600 bg-opacity-70 flex flex-row justify-center items-center mx-auto my-auto">
        <div className="h-[65vh] md:w-[354px] md:h-[520px] bg-slate-200 rounded-[30px] border-2 border-green-600">
          <div className="flex flex-row justify-start items-center gap-[6px] mx-5 my-3">
            <div className="w-12 h-[43px]">
              <img src={Pensvg} alt="pen svg" className="w-16 h-16" />
            </div>
            <div className="flex flex-col justify-center items-start">
              <div className="text-black text-xl font-bold ">Edit Task</div>
              <div className="text-stone-600 text-[12px] font-normal leading-[15px]">
                Update your task of the todo list.
              </div>
            </div>
          </div>
          <form action="" onSubmit={handleEditSubmit} className="mt-10 mx-3">
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
                  value={editedTask.taskName}
                  placeholder="Please enter details here"
                  onChange={handleEditTaskChange}
                  onBlur={() => validateName(editedTask.taskName)}
                  className={`w-[275px] h-[27px] text-sm bg-white rounded-[5px] border ${
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
                  value={editedTask.taskDescription}
                  placeholder="Please enter details here"
                  onChange={handleEditTaskChange}
                  onBlur={() => validateDescription(editedTask.taskDescription)}
                  className={`w-[275px] h-[118px] text-sm bg-white rounded-[5px] border ${
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
                      checked={editedTask.taskPriority === "low"}
                      onChange={handleEditTaskChange}
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
                      checked={editedTask.taskPriority === "medium"}
                      onChange={handleEditTaskChange}
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
                      checked={editedTask.taskPriority === "high"}
                      onChange={handleEditTaskChange}
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
                  <span className="text-red-500 text-[10px]">
                    {priorityError}
                  </span>
                )}
              </div>
            </div>
            <div className="flex flex-row justify-center items-center mt-8">
              <Button
                type="submit"
                wid="w-[167px]"
                hgt="h-[35px]"
                bgColor="bg-green-600"
                hoverBgColor="hover:bg-green-700"
                borderColor="border-green-700"
                buttonName="Update Task"
              />
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default EditTask;
