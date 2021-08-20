import { db } from "config/firebase";
import firebase from "firebase/app";
import { makeAutoObservable, reaction } from "mobx";
import { toast } from "react-toastify";
import { Channel } from "types/channel";
import { store } from "./store";

class ChannelStore {
  channelsRegistery = new Map<string, Channel>();
  selectedChannel: Channel | null = null;
  channelsLimit = 6;
  hasMore = false;
  lastChannelTimestamp: firebase.firestore.FieldValue | null = null;
  unsubscribeChannelsSnapshot?: () => void;

  constructor() {
    makeAutoObservable(this);

    reaction(
      () => this.selectedChannel,
      async (channel) => {
        if (channel) {
          store.messageStore.loadMessages(channel.id);
        }
      }
    );
  }

  reset = () => {
    this.channelsRegistery.clear();
    this.selectedChannel = null;
    this.channelsLimit = 6;
    this.hasMore = false;
    this.lastChannelTimestamp = null;

    if (this.unsubscribeChannelsSnapshot) {
      this.unsubscribeChannelsSnapshot();
      this.unsubscribeChannelsSnapshot = undefined;
    }
  };

  get channels() {
    return Array.from(this.channelsRegistery.values()).sort(
      (a, b) => b.timestamp?.getTime() - a.timestamp?.getTime()
    );
  }

  loadChannels = () => {
    this.unsubscribeChannelsSnapshot = db
      .collection("channels")
      .orderBy("timestamp", "desc")
      .limit(this.channelsLimit)
      .onSnapshot((snapshot) => {
        this.setChannelsFromSnapshot(snapshot);
      });
  };

  loadMore = async () => {
    const chatsSnapshot = await db
      .collection("channels")
      .orderBy("timestamp", "desc")
      .startAfter(this.lastChannelTimestamp)
      .limit(this.channelsLimit)
      .get();

    this.setChannelsFromSnapshot(chatsSnapshot);
  };

  private setChannelsFromSnapshot = (
    channelsSnapshot: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>
  ) => {
    if (channelsSnapshot.size < this.channelsLimit) {
      this.hasMore = false;
    } else {
      this.hasMore = true;
    }

    channelsSnapshot.docs.forEach((doc) => {
      if (!this.channelsRegistery.has(doc.id)) {
        this.lastChannelTimestamp = doc.data().timestamp;
      }

      const channel = {
        id: doc.id,
        name: doc.data().name,
        timestamp: doc.data().timestamp?.toDate(),
      } as Channel;

      this.channelsRegistery.set(channel.id, channel);
    });
  };

  selectChannel = async (id: string) => {
    if (this.channelsRegistery.has(id)) {
      this.selectedChannel = this.channelsRegistery.get(id) as Channel;
    } else {
      this.selectedChannel = null;
    }
  };

  createChannel = async () => {
    const channelName = prompt("Please enter the channel name.");

    if (!channelName) {
      return;
    }

    const { user } = store.userStore;

    if (!user) {
      toast.error("An error occurred. Please try again.");
      return;
    }

    const exists = await this.channelExists(channelName);

    if (exists) {
      toast.error("Channel already exists.");
      return;
    }

    db.collection("channels").add({
      name: channelName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
  };

  private channelExists = async (channelName: string) => {
    let exists = !!this.channels.find(
      (channel) => channel.name === channelName
    );

    if (exists) {
      return true;
    }

    const channelsSnapshot = await db.collection("channels").get();

    exists = !!channelsSnapshot.docs.find(
      (doc) => doc.data().name === channelName
    );

    if (exists) {
      return true;
    }

    return false;
  };
}

export default ChannelStore;
