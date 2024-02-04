import { collection, getDocs, query, where, writeBatch } from "firebase/firestore";
import logo from "../assets/TaskCanvasLogoFirefly2.jpg";
import { useStore } from "../context/StoreContext";
import useAuth from "../templates/useAuth";
import { useState } from "react";
import { TbPasswordFingerprint } from "react-icons/tb";
import { db } from "../firebase/firebaseConfig";

const UserProfile = () => {
  const { currentUser, signOut, deleteAccount } = useAuth(); // Get the current user from your authentication context
  const { setShowProfile } = useStore();

  const displayName = currentUser ? currentUser.displayName : "No Name";
  const email = currentUser ? currentUser.email : "No Email";
  const [password, setPassword] = useState("");
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [error, setError] = useState(null);

  const handlePasswordFocus = () => {
    setPasswordFocused(true);
  };

  const handlePasswordBlur = () => {
    if (!password) {
      setPasswordFocused(false);
    }
  };

  const handleLogOut = async () => {
    try {
      await signOut(); // Call the signOut method to logout the user
      console.log("user signed out");
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      // Delete user data from Firestore
    const userTasksRef = collection(db, "tasks");
    const userTasksQuery = query(
      userTasksRef,
      where("userId", "==", currentUser.uid)
    );
    const userTasksSnapshot = await getDocs(userTasksQuery);
    const userTasksBatch = writeBatch(db);

    userTasksSnapshot.forEach((doc) => {
      userTasksBatch.delete(doc.ref);
    });

    // Delete user's sticky notes data from Firestore
    const userStickyNotesRef = collection(db, "stickyNotes");
    const userStickyNotesQuery = query(
      userStickyNotesRef,
      where("userId", "==", currentUser.uid)
    );
    const userStickyNotesSnapshot = await getDocs(userStickyNotesQuery);
    const userStickyNotesBatch = writeBatch(db);

    userStickyNotesSnapshot.forEach((doc) => {
      userStickyNotesBatch.delete(doc.ref);
    });

    // Commit the batched deletes
    await userTasksBatch.commit();
    await userStickyNotesBatch.commit();

    // After deleting user data, delete the account
      await deleteAccount(email, password);
      console.log("User account deleted");
    } catch (error) {
      if (error.code === "auth/requires-recent-login") {
        setError("Please reauthenticate to delete your account.");
      } else {
        setError(error.message);
      }
    }
  };

  return (
    <>
      <div className="relative h-auto bg-white rounded-lg shadow-md shadow-black flex flex-col justify-center items-center gap-5 p-4 z-10">
        <div
          onClick={() => {
            setShowProfile(false);
          }}
          className=" absolute top-1 right-1 w-6 h-6 bg-red-500 hover:bg-red-600 cursor-pointer text-center text-white font-bold rounded-md px-1"
        >
          X
        </div>
        <div className="w-full flex flex-row justify-start items-start gap-3">
          <div className="flex flex-row justify-center items-center">
            <img
              src={currentUser && currentUser.photoURL ? currentUser.photoURL : logo}
              alt="TaskCanvas logo"
              className="w-14 h-14 rounded-full"
            />
          </div>
          <div className="flex flex-col justify-center items-start">
            <h3 className="text-lg text-slate-600 font-semibold">
              {displayName}
            </h3>
            <p className="text-slate-600">{email}</p>
          </div>
        </div>
        <div className="flex flex-col justify-start items-start gap-5">
          <button
            onClick={handleLogOut}
            className="w-32 h-8 bg-red-500 hover:bg-white hover:text-red-600 text-white font-semibold rounded-2xl border-2 border-red-600 transition-colors duration-200"
          >
            Log Out
          </button>
          <div className="flex flex-col justify-center gap-3">
            <div className="relative flex flex-row justify-center items-center mx-auto">
              <label
                className={`absolute left-0 cursor-text transition-all duration-300 ${
                  passwordFocused || password
                    ? "text-sm -top-3 left-3 bg-white text-gray-700 px-1 rounded-lg"
                    : "top-2 left-10 text-slate-600"
                }`}
                htmlFor="password"
              >
                Password
              </label>
              <TbPasswordFingerprint className="absolute top-2 left-2 text-2xl text-slate-500" />
              <input
                type="password"
                id="password"
                placeholder=""
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={handlePasswordFocus}
                onBlur={handlePasswordBlur}
                className="w-[16rem] h-9 border-2 border-slate-400 rounded-lg focus:outline-none focus:border-blue-500 pl-9"
              />
            </div>
            <p className="text-sm w-56 text-slate-600">
              If you want to delete account then please enter password first
            </p>

            <button
              onClick={handleDeleteAccount}
              className="w-32 h-8 bg-slate-700 hover:bg-white hover:text-slate-700 text-white font-semibold rounded-2xl border-2 border-slate-700 transition-colors duration-200"
            >
              Delete Account
            </button>
            {error && <p className="text-red-500 text-sm w-56">{error}</p>}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
