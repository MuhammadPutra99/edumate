import { auth, db } from './firebaseConfig';
import { 
  setDoc, doc, serverTimestamp, updateDoc, getDoc 
} from 'firebase/firestore';
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword, 
  GoogleAuthProvider, 
  signInWithPopup 
} from 'firebase/auth';

const googleProvider = new GoogleAuthProvider();

/**
 * Register user with email and password
 */
export const registerWithEmail = async (email, password, username) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await setDoc(doc(db, "Users", user.uid), {
      username,
      email,
      createdAt: serverTimestamp(),
      registrationMethod: 'email',
    });

    return user;
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};

/**
 * Login user with email and password
 */
export const loginWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Update login timestamp asynchronously
    setDoc(
      doc(db, "Users", user.uid),
      { lastLogin: serverTimestamp() },
      { merge: true }
    ).catch(console.error);

    return user;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

/**
 * Login or register user with Google
 */
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    await setDoc(
      doc(db, "Users", user.uid),
      {
        username: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        lastLogin: serverTimestamp(),
        registrationMethod: 'google',
      },
      { merge: true }
    );

    return user;
  } catch (error) {
    console.error("Google sign-in error:", error);
    throw error;
  }
};

/**
 * Update user profile with base64 image validation
 */
export const updateProfile = async (uid, updatedData) => {
  try {
    // Validate image size (if Base64)
    if (updatedData.photoURL && updatedData.photoURL.startsWith('data:image')) {
      const base64Size = Math.ceil((updatedData.photoURL.length * 3) / 4);
      if (base64Size > 1024 * 1024) {
        throw new Error("Image size too large. Please use an image less than 1MB.");
      }
    }

    // Update Firestore document
    const userRef = doc(db, "Users", uid);
    await updateDoc(userRef, {
      ...updatedData,
      updatedAt: serverTimestamp(),
    });

    console.log("Profile updated successfully");
    return true;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
};

/**
 * Fetch user profile from Firestore
 */
export const getUserProfile = async (uid) => {
  try {
    const userRef = doc(db, "Users", uid);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      return userDoc.data();
    }
    return null;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};
