import { useEffect, useState } from "react";
import { auth } from "../firebase/firebaseConfig";
import { deleteUser, signInWithEmailAndPassword } from "firebase/auth";

const useAuth = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    // Cleanup function
    return unsubscribe;
  }, []);

  const signOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  const deleteAccount = async (email, password) => {
    try {
      // Sign in the user with email and password for reauthentication
      await signInWithEmailAndPassword(auth, email, password);

      // If sign-in successful, delete the user account
      const user = auth.currentUser;
      await deleteUser(user);
      setCurrentUser(null); // Update state to reflect the user deletion
      console.log("User account deleted successfully");
    } catch (error) {
      console.error("Error deleting account:", error.message);
      throw error;
    }
  };

  return { currentUser, signOut, deleteAccount };
};

export default useAuth;
