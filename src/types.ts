export type MessageContent = {
  data(): {
    message: string;
    timestamp: any;
    user: string;
    userImg: string | null;
  };
  id: string;
};
