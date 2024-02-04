import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";
import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
  updateDoc,
  doc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";
import useAuth from "../templates/useAuth";

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [tasks, setTasks] = useState([]);

  // for pre loading tasks data from the store
  useEffect(() => {
    const fetchTasks = async (currentUser) => {
      if (currentUser) {
        const tasksRef = collection(db, "tasks");
        const tasksQuery = query(
          tasksRef,
          where("userId", "==", currentUser.uid)
        );

        const unsubscribe = onSnapshot(tasksQuery, (snapshot) => {
          const tasksData = [];
          snapshot.forEach((doc) => {
            tasksData.push({ id: doc.id, ...doc.data() });
          });
          setTasks(tasksData);
        });

        return () => unsubscribe();
      }
    };

    // Fetch tasks when currentUser changes
    fetchTasks(currentUser);
  }, [currentUser]);

  const [taskData, setTaskData] = useState({
    userId: "",
    taskName: "",
    taskDescription: "",
    taskPriority: "",
    status: "In Progress", // Default status
  });

  const updateTaskData = async (taskId, updatedTaskData) => {
    try {
      await updateDoc(doc(db, "tasks", taskId), updatedTaskData);
      console.log("Task data updated successfully!");
    } catch (error) {
      console.error("Error updating task data: ", error);
    }
  };

  const addTask = async (userId) => {
    const newTask = { ...taskData, userId: userId };

    try {
      // Add the new task document to the 'tasks' collection
      const docRef = await addDoc(collection(db, "tasks"), newTask);
      console.log("Task added with ID: ", docRef.id);
      await docRef.get();
      setTasks((prevTasks) => [...prevTasks, newTask]);
    } catch (error) {
      console.error("Error adding task: ", error);
    }
  };

  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      await updateDoc(doc(db, "tasks", taskId), { status: newStatus });
      console.log("Task status updated successfully!");
    } catch (error) {
      console.error("Error updating task status: ", error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await deleteDoc(doc(db, "tasks", taskId));
      console.log("Task deleted successfully!");
    } catch (error) {
      console.error("Error deleting task: ", error);
    }
  };

  const [stickyNotes, setStickyNotes] = useState([]);
  // const [pinnedStickyNotes, setPinnedStickyNotes] = useState([]);
  const [stickyData, setStickyData] = useState({
    userId: "",
    title: "",
    description: "",
    stickyColor: "#00D1FF", // Default color: Cyan
    textColor: "#000000", // Default color: Black
    pinned: false, //Default pinned: false
  });

  // load all sticky data from firestore
  useEffect(() => {
    const fetchStickyNotes = () => {
      if (currentUser) {
        const stickyNotesRef = collection(db, "stickyNotes");
        const userStickyNotesQuery = query(
          stickyNotesRef,
          where("userId", "==", currentUser.uid)
        );
        const unsubscribe = onSnapshot(userStickyNotesQuery, (snapshot) => {
          const stickyNotesData = [];
          snapshot.forEach((doc) => {
            stickyNotesData.push({ id: doc.id, ...doc.data() });
          });
          setStickyNotes(stickyNotesData);
        });

        return unsubscribe;
      } else {
        return () => {}; // Return a dummy function when currentUser is not defined
      }
    };

    // Fetch sticky notes data
    const unsubscribeStickyNotes = fetchStickyNotes();

    return () => {
      // Unsubscribe from real-time updates when component unmounts
      unsubscribeStickyNotes();
    };
  }, [currentUser]);

  const addStickyNote = async (stickyNote) => {
    try {
      const newStickyNote = { ...stickyNote, userId: currentUser.uid };
      const docRef = await addDoc(collection(db, "stickyNotes"), newStickyNote);
      console.log("Sticky note added with ID: ", docRef.id);
      await docRef.get();
      setStickyNotes((prevNotes) => [...prevNotes, newStickyNote]);
    } catch (error) {
      console.error("Error adding sticky note: ", error);
    }
  };

  const deleteSticky = async (stickyId) => {
    try {
      await deleteDoc(doc(db, "stickyNotes", stickyId));
      console.log("Sticky note deleted successfully!");
    } catch (error) {
      console.error("Error deleting sticky note: ", error);
    }
  };

  const togglePin = async (stickyNoteId) => {
    try {
      const stickyNoteRef = doc(db, "stickyNotes", stickyNoteId);
      const stickyNoteSnapshot = await getDoc(stickyNoteRef);

      if (stickyNoteSnapshot.exists()) {
        const currentPinnedStatus = stickyNoteSnapshot.data().pinned;
        await updateDoc(stickyNoteRef, { pinned: !currentPinnedStatus });
        console.log("Sticky note pin status updated successfully!");
      } else {
        console.error("Sticky note not found!");
      }
    } catch (error) {
      console.error("Error toggling sticky note pin status: ", error);
    }
  };

  const inProgressTasks = tasks.filter((task) => task.status === "In Progress");
  const completedTasks = tasks.filter((task) => task.status !== "In Progress");
  const pinnedSticky = stickyNotes.filter((note) => note.pinned);

  const [showSearchInput, setShowSearchInput] = useState(false);
  const [showSearchResult, setShowSearchResult] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [combinedResult, setCombinedResult] = useState([]);

  // Function to handle input change
  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
    // Implement your search logic here
    const filteredTasks = tasks.filter((task) =>
      task.taskName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredStickyNotes = stickyNotes.filter((note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setCombinedResult([...filteredTasks, ...filteredStickyNotes]);
    console.log("handleInputChange value: " + event.target.value);
  };

  // Function to handle search submission
  const handleSearchSubmit = (event) => {
    event.preventDefault();

    // Implement your search logic here
    const filteredTasks = tasks.filter((task) =>
      task.taskName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredStickyNotes = stickyNotes.filter((note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const combinedResults = [...filteredTasks, ...filteredStickyNotes];

    setSearchResults(combinedResults);
    setSearchQuery("");
    setShowSearchResult(true);
    setShowSearchInput(false);
    console.log("filtered Tasks: ", filteredTasks);
    console.log("filtered sticky notes: ", filteredStickyNotes);
    console.log("combined result: ", combinedResults);
    console.log("SearchResults: ", searchResults);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // for login and sign up
  const [sliderToggle, setSliderToggle] = useState(true);

  // for current user
  // const [currentUser, setCurrentUser] = useState(null);

  // for profile display or sign in/up page
  const [showProfile, setShowProfile] = useState(false); // State to control the visibility of the profile overlay

  // for menu overlay on small screens
  const [showMenu, setShowMenu] = useState(false); // State to control the visibility of the menu overlay

  return (
    <StoreContext.Provider
      value={{
        taskData,
        setTaskData,
        updateTaskData,
        tasks,
        setTasks,
        addTask,
        updateTaskStatus,
        deleteTask,
        stickyData,
        setStickyData,
        stickyNotes,
        addStickyNote,
        deleteSticky,
        togglePin,
        pinnedSticky,
        inProgressTasks,
        completedTasks,
        showSearchInput,
        setShowSearchInput,
        showSearchResult,
        setShowSearchResult,
        searchResults,
        combinedResult,
        searchQuery,
        handleInputChange,
        handleSearchSubmit,
        scrollToTop,
        sliderToggle,
        setSliderToggle,
        showProfile,
        setShowProfile,
        showMenu,
        setShowMenu,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
};
