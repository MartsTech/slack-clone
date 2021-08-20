import { observer } from "mobx-react-lite";
import { useStore } from "stores/store";
import styled from "styled-components";
import ChatMessagesItem from "./ChatMessagesItem";

const ChatMessages = () => {
  const { messages } = useStore().messageStore;

  return (
    <StyledContainer>
      {messages.map((message) => (
        <ChatMessagesItem key={message.id} message={message} />
      ))}
    </StyledContainer>
  );
};

export default observer(ChatMessages);

const StyledContainer = styled.div`
  flex-grow: 1;
`;
