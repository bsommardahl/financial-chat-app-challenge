import React, { useState, useEffect, useContext } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

interface FirebaseContext {
  isAuthenticated: boolean;
  user: firebase.User | null;
  loading: boolean;
  signOut: () => Promise<void>;
  signInWithGoogle: () => Promise<firebase.auth.UserCredential>;
}

export const FirebaseContext = React.createContext<null | FirebaseContext>(
  null
);

export const useFirebase = () => useContext(FirebaseContext)!;

export let authInstance: firebase.auth.Auth | null = null;

interface FirebaseProviderProps {
  children: React.ReactElement;
}

export const FirebaseProvider = ({ children }: FirebaseProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<firebase.User | null>(null);
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState<firebase.auth.Auth>();
  const [, setDb] = useState<firebase.database.Database>();

  useEffect(() => {
    const initFirebase = () => {
      firebase.initializeApp(config);
      const authHook = firebase.auth();
      authInstance = authHook;
      setAuth(authHook);
      setDb(firebase.database());
      authHook.onAuthStateChanged((userChanged: firebase.User | null) => {
        if (userChanged) {
          setIsAuthenticated(true);
          setUser(userChanged);
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }
        setLoading(false);
      });
    };

    initFirebase();
  }, []);

  const signOut = () => auth!.signOut();

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    return auth!.signInWithPopup(provider);
  };

  return (
    <FirebaseContext.Provider
      value={{
        loading,
        user,
        isAuthenticated,
        signOut,
        signInWithGoogle,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseContext;
