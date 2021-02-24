import { SvgIconTypeMap } from "@material-ui/core";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import React from "react";
import { db } from "../firebase";
import styled from "styled-components";

interface SidebarOptionProps {
  Icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
  title?: string;
  addChannelOption?: boolean;
}

export const SidebarOption: React.FC<SidebarOptionProps> = ({
  Icon,
  title,
  addChannelOption,
}) => {
  const addChannel = () => {
    const channelName = prompt("Please enter the channel name");

    if (channelName) {
      db.collection("rooms").add({
        name: channelName,
      });
    }
  };

  const selectChannel = () => {};

  return (
    <SidebarOptionContainer
      onClick={addChannelOption ? addChannel : selectChannel}
    >
      {Icon && <Icon fontSize="small" style={{ padding: 10 }} />}
      {Icon ? (
        <h3>{title}</h3>
      ) : (
        <SidebarOptionChannel>
          <span>#</span> {title}
        </SidebarOptionChannel>
      )}
    </SidebarOptionContainer>
  );
};

const SidebarOptionContainer = styled.div`
  display: flex;
  font-size: 0.75rem;
  align-items: center;
  padding-left: 2px;
  cursor: pointer;

  :hover {
    opacity: 0.9;
    background-color: var(--sidebar-option-color);
  }

  > h3 {
    font-weight: 500;
  }

  > h3 > span {
    padding: 15px;
  }
`;

const SidebarOptionChannel = styled.div``;
