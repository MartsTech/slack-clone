import { auth, provider } from "config/firebase";
import { makeAutoObservable, runInAction } from "mobx";
import { toast } from "react-toastify";
import { User } from "types/user";
import { resetStore } from "./store";

class UserStore {
  user: User | null = null;
  loading: boolean = true;

  constructor() {
    makeAutoObservable(this);
  }

  reset = () => {
    this.user = null;
    this.loading = true;
  };

  signIn = () => {
    this.loading = true;

    auth
      .signInWithPopup(provider)
      .then(({ user }) => {
        if (user) {
          runInAction(() => {
            this.user = {
              displayName: user.displayName!,
              photoURL: user.photoURL!,
            };
          });
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });

    this.loading = false;
  };

  signOut = () => {
    auth.signOut();
    resetStore();
  };

  setUser = (user: User | null) => {
    this.user = user;
    this.loading = false;
  };
}

export default UserStore;
