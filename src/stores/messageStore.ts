import { db } from "config/firebase";
import firebase from "firebase/app";
import { makeAutoObservable } from "mobx";
import { toast } from "react-toastify";
import { Message } from "types/message";
import { store } from "./store";

class MessageStore {
  messagesRegistery = new Map<string, Message>();
  messagesLimit = 10;
  hasMore = false;
  lastMessageTimestamp: firebase.firestore.FieldValue | null = null;
  unsubscribeMessagesSnapshot?: () => void;

  constructor() {
    makeAutoObservable(this);
  }

  reset = () => {
    this.messagesRegistery.clear();
    this.messagesLimit = 10;
    this.hasMore = false;
    this.lastMessageTimestamp = null;

    if (this.unsubscribeMessagesSnapshot) {
      this.unsubscribeMessagesSnapshot();
      this.unsubscribeMessagesSnapshot = undefined;
    }
  };

  get messages() {
    return Array.from(this.messagesRegistery.values())
      .sort((a, b) => a.timestamp?.getTime() - b.timestamp?.getTime())
      .reverse();
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
        this.setMessagesFromSnapshot(snapshot);
      });
  };

  loadMore = async () => {
    const { selectedChannel } = store.channelStore;

    if (!selectedChannel) {
      toast.error("An error occurred. Please try again.");
      return;
    }

    const messagesSnapshot = await db
      .collection("channels")
      .doc(selectedChannel.id)
      .collection("messages")
      .orderBy("timestamp", "desc")
      .startAfter(this.lastMessageTimestamp)
      .limit(this.messagesLimit)
      .get();

    this.setMessagesFromSnapshot(messagesSnapshot);
  };

  private setMessagesFromSnapshot = (
    messagesSnapshot: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>
  ) => {
    if (messagesSnapshot.size < this.messagesLimit) {
      this.hasMore = false;
    } else {
      this.hasMore = true;
    }

    messagesSnapshot.docs.forEach((doc) => {
      if (this.messagesRegistery.has(doc.id)) {
        return;
      }

      if (!this.lastMessageTimestamp) {
        this.lastMessageTimestamp = doc.data().timestamp;
      } else {
        // @ts-ignore
        const lastTimestamp = this.lastMessageTimestamp?.toDate()?.getTime();
        const currentTimestamp = doc.data().timestamp?.toDate()?.getTime();

        if (currentTimestamp < lastTimestamp) {
          this.lastMessageTimestamp = doc.data().timestamp;
        }
      }

      const message = {
        id: doc.id,
        message: doc.data().message,
        user: doc.data().user,
        photoURL: doc.data().photoURL,
        timestamp: doc.data().timestamp?.toDate(),
      } as Message;

      this.messagesRegistery.set(message.id, message);
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

    return true;
  };
}

export default MessageStore;
