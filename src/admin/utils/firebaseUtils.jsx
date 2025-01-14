// utils/firebaseUtils.js
import { doc, getDoc } from "firebase/firestore";
import { toast } from "react-hot-toast";
import { db } from "../auth/firebaseConfig";

export const fetchUserProfile = async (userId, currentUser) => {
  try {
    const userDocRef = doc(db, "Users", userId);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      const userData = userDoc.data();
      return {
        username: userData.username || currentUser.displayName || "",
        photoURL: userData.photoURL || "",
        description: userData.description || "",
        instagram: userData.instagram || "",
        school: userData.school || "",
        location: userData.location || "",
      };
    }
    return null;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    toast.error("Failed to load profile data");
    throw error;
  }
};