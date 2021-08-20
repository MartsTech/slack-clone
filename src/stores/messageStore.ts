import { db } from "config/firebase";
import firebase from "firebase/app";
import { makeAutoObservable, runInAction } from "mobx";
import { toast } from "react-toastify";
import { Message } from "types/message";
import { store } from "./store";

class MessageStore {
  messagesRegistery = new Map<string, Message>();
  messagesLimit = 10;
  scrollToBottom = false;
  unsubscribeMessagesSnapshot?: () => void;

  constructor() {
    makeAutoObservable(this);
  }

  reset = () => {
    this.messagesRegistery.clear();
    this.messagesLimit = 10;
    this.scrollToBottom = false;

    if (this.unsubscribeMessagesSnapshot) {
      this.unsubscribeMessagesSnapshot();
      this.unsubscribeMessagesSnapshot = undefined;
    }
  };

  get messages() {
    return Array.from(this.messagesRegistery.values()).sort(
      (a, b) => a.timestamp?.getTime() - b.timestamp?.getTime()
    );
  }

  loadMessages = (id: string) => {
    this.messagesRegistery.clear();

    if (this.unsubscribeMessagesSnapshot) {
      this.unsubscribeMessagesSnapshot();
    }

    this.unsubscribeMessagesSnapshot = db
      .collection("channels")
      .doc(id)
      .collection("messages")
      .orderBy("timestamp", "desc")
      .limit(this.messagesLimit)
      .onSnapshot((snapshot) => {
        snapshot.docs.forEach((doc) => {
          if (this.messagesRegistery.has(id)) {
            return;
          }

          const message = {
            id: doc.id,
            message: doc.data().message,
            user: doc.data().user,
            photoURL: doc.data().photoURL,
            timestamp: doc.data().timestamp?.toDate(),
          } as Message;

          runInAction(() => {
            this.messagesRegistery.set(message.id, message);
          });
        });
      });

    new Promise((res) => setTimeout(res, 400)).then(() => {
      store.messageStore.setScrollToBottom(true);
    });
  };

  sendMessage = (message: string) => {
    const user = store.userStore.user;
    const channel = store.channelStore.selectedChannel;

    if (!user || !channel) {
      toast.error("An error occurred. Please try again.");
      return false;
    }

    const channelRef = db.collection("channels").doc(channel.id);

    channelRef.collection("messages").add({
      message,
      user: user.displayName,
      photoURL: user.photoURL,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    this.scrollToBottom = true;

    return true;
  };

  setScrollToBottom = (state: boolean) => {
    this.scrollToBottom = state;
  };
}

export default MessageStore;
