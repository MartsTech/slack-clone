import styled from "styled-components";
import ChatHeader from "./header/ChatHeader";
import ChatInput from "./input/ChatInput";
import ChatMessages from "./messages/ChatMessages";
import ChatMessagesBottom from "./messages/ChatMessagesBottom";
import ChatMessagesTop from "./messages/ChatMessagesTop";

const Chat = () => {
  return (
    <StyledContainer>
      <ChatHeader />
      <ChatMessagesTop />
      <ChatMessages />
      <ChatMessagesBottom />
      <ChatInput />
    </StyledContainer>
  );
};

export default Chat;

const StyledContainer = styled.section`
  flex: 0.7;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  overflow: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;
