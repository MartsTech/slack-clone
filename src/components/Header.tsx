import { Avatar, TextField } from "@material-ui/core";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import HelpOutlinedIcon from "@material-ui/icons/HelpOutline";
import SearchIcon from "@material-ui/icons/Search";
import React from "react";
import styled from "styled-components";

export const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <HeaderLeft>
        <HeaderAvatar alt="avatar" />
        <AccessTimeIcon />
      </HeaderLeft>
      <HeaderSearch>
        <SearchIcon />
        <HeaderInput
          size="small"
          variant="filled"
          label="Search in MartsTech"
          InputProps={{ disableUnderline: true }}
        />
      </HeaderSearch>
      <HeaderRight>
        <HelpOutlinedIcon />
      </HeaderRight>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  position: fixed;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  background-color: var(--slack-color);
  color: white;
`;

const HeaderLeft = styled.div`
  flex: 0.3;
  display: flex;
  align-items: center;
  margin-left: 20px;

  > svg {
    margin-left: auto;
    margin-right: 30px;
  }
`;

const HeaderAvatar = styled(Avatar)`
  cursor: pointer;

  :hover {
    opacity: 0.8;
  }
`;

const HeaderSearch = styled.div`
  flex: 0.4;
  align-items: center;
  opacity: 1;
  border-radius: 6px;
  background-color: var(--header-search-color);
  text-align: center;
  display: flex;
  padding: 0 50px;
  color: gray;
  border: 1px gray solid;
`;

const HeaderInput = styled(TextField)`
  min-width: 100% !important;

  > label {
    color: gray !important;
  }

  > div > input {
    background-color: var(--header-search-color);
    color: white;
    border: none !important;
  }
`;

const HeaderRight = styled.div`
  flex: 0.3;
  display: flex;
  align-items: flex-end;

  > svg {
    margin-left: auto;
    margin-right: 20px;
  }
`;
