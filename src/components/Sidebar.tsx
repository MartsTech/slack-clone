import AppsIcon from "@material-ui/icons/Apps";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import CreateIcon from "@material-ui/icons/Create";
import DraftsIcon from "@material-ui/icons/Drafts";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import InboxIcon from "@material-ui/icons/Inbox";
import InsertCommentIcon from "@material-ui/icons/InsertComment";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import React from "react";
import styled from "styled-components";
import { SidebarOption } from "./SidebarOption";
import { StatusBadge } from "./StatusBadge";
import AddIcon from "@material-ui/icons/Add";

export const Sidebar: React.FC = () => {
  return (
    <SidebarContainer>
      <SidebarHeader>
        <SidebarInfo>
          <h2>MartsTech HQ</h2>
          <h3>
            <SidebarStatus>
              <StatusBadge />
            </SidebarStatus>
            Martin Velkov
          </h3>
        </SidebarInfo>
        <CreateIcon />
      </SidebarHeader>

      <SidebarOption Icon={InsertCommentIcon} title="Threads" />
      <SidebarOption Icon={InboxIcon} title="Mentions & reactions" />
      <SidebarOption Icon={DraftsIcon} title="Saved items" />
      <SidebarOption Icon={BookmarkBorderIcon} title="Channel browser" />
      <SidebarOption Icon={PeopleAltIcon} title="People & user groups" />
      <SidebarOption Icon={AppsIcon} title="Apps" />
      <SidebarOption Icon={FileCopyIcon} title="File browser" />
      <SidebarOption Icon={ExpandLessIcon} title="Show less" />
      <hr />
      <SidebarOption Icon={ExpandMoreIcon} title="Channels" />
      <hr />
      <SidebarOption Icon={AddIcon} title="Add Channel" addChannelOption />
    </SidebarContainer>
  );
};

const SidebarContainer = styled.div`
  color: white;
  background-color: var(--slack-color);
  flex: 0.3;
  border-top: 1px solid var(--sidebar-color);
  max-width: 260px;
  margin-top: 70px;

  > hr {
    margin-top: 10px;
    margin-bottom: 10px;
    border: 1px solid var(--sidebar-color);
  }
`;

const SidebarHeader = styled.div`
  display: flex;
  border-bottom: 1px solid var(--sidebar-color);
  padding: 13px;

  > svg {
    padding: 8px;
    color: var(--sidebar-color);
    font-size: 18px;
    background-color: white;
    border-radius: 50%;
  }
`;

const SidebarInfo = styled.div`
  flex: 1;

  > h2 {
    font-size: 1rem;
    font-weight: 900;
    margin-bottom: 5px;
  }

  > h3 {
    display: flex;
    font-size: 0.9rem;
    font-weight: 400;
    align-items: center;
  }
`;

const SidebarStatus = styled.div`
  > span {
    margin-bottom: 3px !important;
    margin-right: 12px !important;
  }

  > span > span {
    object-fit: contain;
    height: 12px;
    width: 12px;
    border-radius: 50%;
  }
`;
