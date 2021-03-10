import { Button } from "@material-ui/core";
import React, { useRef } from "react";
import { auth, db } from "../firebase";
import styled from "styled-components";
import firebase from "firebase/app";
import { useAuthState } from "react-firebase-hooks/auth";

interface ChatInputProps {
  chatRef: React.RefObject<HTMLDivElement>;
  channelId: string | null;
  channelName: string;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  chatRef,
  channelId,
  channelName,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [user] = useAuthState(auth);

  const sendMessage = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if (!channelId || !inputRef.current) {
      return;
    }

    if (inputRef.current.value === "") {
      return;
    }

    db.collection("rooms").doc(channelId).collection("messages").add({
      message: inputRef.current.value,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      user: user?.displayName,
      userImg: user?.photoURL,
    });

    chatRef.current?.scrollIntoView({
      behavior: "smooth",
    });

    inputRef.current.value = "";
  };

  return (
    <ChatInputCointainer>
      <form>
        <input
          ref={inputRef}
          type="text"
          placeholder={`Message #${channelName}`}
        />
        <Button hidden type="submit" onClick={sendMessage}>
          SEND
        </Button>
      </form>
    </ChatInputCointainer>
  );
};

const ChatInputCointainer = styled.div`
  border-radius: 20px;

  > form {
    position: relative;
    display: flex;
    justify-content: center;
  }

  > form > input {
    position: fixed;
    bottom: 30px;
    width: 60%;
    border: 1px solid gray;
    border-radius: 3px;
    padding: 20px;
    outline: none;
  }

  > form > button {
    display: none !important;
  }
`;
