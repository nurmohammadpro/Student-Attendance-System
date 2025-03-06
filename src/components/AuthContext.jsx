import { createContext, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth"; // ✅ Correct import
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase"; // Ensure `auth` & `db` are initialized properly

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ Prevents blank screen while loading

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        try {
          const userDocRef = doc(db, "users", authUser.uid);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            setUser({
              uid: authUser.uid,
              email: authUser.email,
              ...userDocSnap.data(),
            });
          } else {
            setUser(authUser); // Fallback to Firebase Auth user if Firestore data is missing
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        setUser(null);
      }
      setLoading(false); // ✅ Prevents app from being stuck in a loading state
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
