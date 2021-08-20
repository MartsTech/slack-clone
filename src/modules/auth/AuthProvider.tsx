import { auth } from "config/firebase";
import { useEffect } from "react";
import { useStore } from "stores/store";

const AuthProvider: React.FC = ({ children }) => {
  const { setUser } = useStore().userStore;

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser({
          displayName: user.displayName!,
          photoURL: user.photoURL!,
        });
      } else {
        setUser(null);
      }
    });
  }, [setUser]);

  return <>{children}</>;
};

export default AuthProvider;
