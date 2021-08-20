import { observer } from "mobx-react-lite";
import { useEffect, useRef } from "react";
import { useStore } from "stores/store";
import styled from "styled-components";

const ChatMessagesBottom = () => {
  const { scrollToBottom, setScrollToBottom } = useStore().messageStore;
  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollToBottom) {
      chatBottomRef.current?.scrollIntoView({
        behavior: "smooth",
      });
      setScrollToBottom(false);
    }
  }, [scrollToBottom, setScrollToBottom]);

  return <StyledContainer ref={chatBottomRef} />;
};

export default observer(ChatMessagesBottom);

const StyledContainer = styled.div`
  padding-bottom: 10rem;
`;
